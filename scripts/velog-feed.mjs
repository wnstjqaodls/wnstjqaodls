// velog 글을 모아 README의 마커 사이를 갱신한다.
//
// velog는 전역 피드(/rss)와 사용자 피드(/rss/@handle)만 제공한다. 태그·트렌드
// 피드는 404다. 전역 피드에는 한국어 개발 글 외에 중국어 스팸 계정 글이 섞여
// 들어오므로, 본문의 한글/한자 비율로 걸러낸다.
//
// 의존성 없이 Node 22 내장 fetch만 사용한다.

import { readFile, writeFile } from 'node:fs/promises'

const README = 'README.md'
const START = '<!-- VELOG:START -->'
const END = '<!-- VELOG:END -->'
const MAX_ITEMS = 6

// 전역 피드는 신선하지만 잡음이 많고, 사용자 피드는 조용하지만 확실하다. 둘을 섞는다.
// 사용자 핸들은 추가 전에 https://api.velog.io/rss/@handle 이 200인지 확인한다 —
// 없는 핸들은 404를 주고, 여기서는 경고만 남기고 조용히 건너뛴다.
const FEEDS = [
  'https://api.velog.io/rss',
  'https://api.velog.io/rss/@velopert',
  'https://api.velog.io/rss/@teo',
  'https://api.velog.io/rss/@eddy_song',
  'https://api.velog.io/rss/@jakeseo_me',
  'https://api.velog.io/rss/@tosspayments',
]

// 제목·본문에 하나라도 걸리면 개발 글로 본다. 넓게 잡고 언어 필터로 정밀도를 얻는다.
const DEV_KEYWORDS = [
  '개발', '코드', '코딩', '구현', '리팩터', '리팩토링', '아키텍처', '설계', '배포', '서버',
  '데이터베이스', '쿼리', '트랜잭션', '인덱스', '캐시', '테스트', '디버깅', '성능', '최적화',
  '알고리즘', '자료구조', '네트워크', '인프라', '컨테이너', '오류', '에러', '버그', '트러블슈팅',
  '라이브러리', '프레임워크', 'api', 'rest', 'graphql', 'http', 'sql', 'nosql', 'orm',
  'java', 'kotlin', 'spring', 'javascript', 'typescript', 'react', 'vue', 'svelte', 'node',
  'python', 'django', 'fastapi', 'go', 'rust', 'c++', 'swift', 'flutter',
  'docker', 'kubernetes', 'k8s', 'aws', 'gcp', 'terraform', 'ansible', 'nginx', 'linux',
  'git', 'ci/cd', 'devops', 'redis', 'kafka', 'postgres', 'mysql', 'mongodb', 'elasticsearch',
]

const HANGUL = /[가-힣]/g
const HAN = /[一-鿿]/g
const KANA = /[぀-ヿ]/g

function decodeEntities(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&amp;/g, '&')
}

function tagText(itemXml, tag) {
  const m = itemXml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))
  if (!m) return ''
  const raw = m[1].trim()
  const cdata = raw.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/)
  return decodeEntities((cdata ? cdata[1] : raw).trim())
}

function stripHtml(html) {
  return html
    .replace(/<pre[\s\S]*?<\/pre>/gi, ' ')
    .replace(/<code[\s\S]*?<\/code>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function parseItems(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => {
    const body = m[1]
    const link = tagText(body, 'link')
    const author = link.match(/velog\.io\/@([^/]+)\//)
    return {
      title: tagText(body, 'title'),
      link,
      author: author ? decodeURIComponent(author[1]) : '',
      published: tagText(body, 'pubDate'),
      summary: stripHtml(tagText(body, 'description')),
    }
  })
}

function count(text, re) {
  return (text.match(re) ?? []).length
}

/**
 * 한국어 글인지 판정한다.
 *
 * 전역 피드에는 velog를 도배용으로 쓰는 중국어 계정 글이 섞인다. 한글이 거의 없고
 * 한자가 많은 글을 걸러내면 대부분 잡힌다. 한국어 기술 글도 한자를 쓰긴 하지만
 * (예: 汎用) 한글이 압도적으로 많으므로 비율로 구분된다. 일본어는 가나로 판별한다.
 */
function isKorean({ title, summary }) {
  const text = `${title} ${summary}`
  const hangul = count(text, HANGUL)
  const han = count(text, HAN)
  const kana = count(text, KANA)

  if (kana > 0) return false
  if (hangul < 10) return false // 영문 제목이어도 본문 한글로 판정한다
  return hangul > han * 4
}

function isDevPost({ title, summary }) {
  const text = `${title} ${summary}`.toLowerCase()
  return DEV_KEYWORDS.some((k) => text.includes(k))
}

async function fetchFeed(url) {
  try {
    const res = await fetch(url, {
      headers: { 'user-agent': 'wnstjqaodls-profile-feed' },
      signal: AbortSignal.timeout(15_000),
    })
    if (!res.ok) {
      console.warn(`skip ${url}: HTTP ${res.status}`)
      return []
    }
    return parseItems(await res.text())
  } catch (err) {
    console.warn(`skip ${url}: ${err.message}`)
    return []
  }
}

function formatDate(value) {
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  // 발행일은 KST 기준으로 읽는다.
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(d)
    .replace(/\.$/, '')
    .replace(/\s/g, '')
}

function render(items) {
  if (items.length === 0) {
    return '아직 표시할 글이 없습니다.'
  }
  const rows = items.map((it) => {
    const title = it.title.replace(/\|/g, '\\|')
    const date = formatDate(it.published)
    return `| ${date} | [${title}](${it.link}) | [@${it.author}](https://velog.io/@${it.author}) |`
  })
  return ['| 날짜 | 글 | 글쓴이 |', '|---|---|---|', ...rows].join('\n')
}

async function main() {
  const feeds = await Promise.all(FEEDS.map(fetchFeed))

  const seen = new Set()
  const items = feeds
    .flat()
    .filter((it) => it.title && it.link && it.author)
    .filter((it) => {
      if (seen.has(it.link)) return false
      seen.add(it.link)
      return true
    })
    .filter(isKorean)
    .filter(isDevPost)
    .sort((a, b) => new Date(b.published) - new Date(a.published))
    .slice(0, MAX_ITEMS)

  console.log(`수집 ${feeds.flat().length}건 -> 게시 ${items.length}건`)

  const readme = await readFile(README, 'utf8')
  const startAt = readme.indexOf(START)
  const endAt = readme.indexOf(END)
  if (startAt === -1 || endAt === -1) {
    throw new Error(`README에 ${START} / ${END} 마커가 없다.`)
  }

  const next =
    readme.slice(0, startAt + START.length) +
    '\n' +
    render(items) +
    '\n' +
    readme.slice(endAt)

  if (next === readme) {
    console.log('변경 없음')
    return
  }
  await writeFile(README, next)
  console.log('README 갱신')
}

await main()
