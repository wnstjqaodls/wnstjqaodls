# 김준섭

백엔드와 인프라를 함께 다룹니다. 직접 운영하는 홈랩 위에 서비스를 올리고, 배포와 모니터링까지
붙여 끝까지 굴러가게 만드는 쪽에 관심이 있습니다.

---

## 기술 스택

**Backend**

![Java](https://img.shields.io/badge/Java-007396?style=flat-square&logo=openjdk&logoColor=white)
![Kotlin](https://img.shields.io/badge/Kotlin-7F52FF?style=flat-square&logo=kotlin&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![Ktor](https://img.shields.io/badge/Ktor-087CFA?style=flat-square&logo=ktor&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![Gradle](https://img.shields.io/badge/Gradle-02303A?style=flat-square&logo=gradle&logoColor=white)

**Frontend**

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-FFD859?style=flat-square&logo=vuedotjs&logoColor=black)

**Data**

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![Flyway](https://img.shields.io/badge/Flyway-CC0200?style=flat-square&logo=flyway&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-FF4438?style=flat-square&logo=redis&logoColor=white)

**Infra / Ops**

![Proxmox](https://img.shields.io/badge/Proxmox-E57000?style=flat-square&logo=proxmox&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black)
![NGINX](https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=nginx&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-844FBA?style=flat-square&logo=terraform&logoColor=white)
![Ansible](https://img.shields.io/badge/Ansible-EE0000?style=flat-square&logo=ansible&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)
![MikroTik](https://img.shields.io/badge/MikroTik-293239?style=flat-square&logo=mikrotik&logoColor=white)

---

## 공개 프로젝트

### [side-market-data-platform](https://github.com/wnstjqaodls/side-market-data-platform) — MKDP

DART 공시·재무를 조회하고, 주식과 ETF로 포트폴리오 백테스트를 돌리는 서비스입니다.
**Live: [mkdp.qwer4.org](https://mkdp.qwer4.org)**

2022년에 다른 개발자와 시작했다가 멈춘 프로젝트를 다시 만든 것입니다. 당시 핵심 기능이었던
백테스트는 DART가 일별 주가를 제공하지 않아 구현 자체가 불가능한 설계였고, 그게 프로젝트가
멈춘 진짜 이유였습니다. 남은 코드에서 의도를 역추적한 기록은
[V1 회고](https://github.com/wnstjqaodls/side-market-data-platform/blob/main/docs/V1-RETROSPECTIVE.md)에
정리했습니다.

`Kotlin 2.0` · `Spring Boot 3.3` · `Vue 3` · `PostgreSQL 16` · `Flyway` · 단일 jar + systemd + nginx

---

## 홈랩

Proxmox 위에 LXC·VM으로 워크로드를 나누고, MikroTik과 Cisco로 VLAN을 분리해 운영합니다.
외부 노출은 Cloudflare Tunnel로만 열고, 상태는 LibreNMS로 봅니다.

새 서비스를 올릴 때는 매번 같은 순서를 따릅니다 —
LXC 생성 → nginx → Cloudflare Tunnel → 헬스체크 → 관리 대시보드 등록 → LibreNMS 편입.

---

## velog 최신 개발 글

<!-- VELOG:START -->
| 날짜 | 글 | 글쓴이 |
|---|---|---|
| 2026.09.05 | [듀오링고는 왜 하트를 에너지로 바꿨을까? — 2025 UX/UI 사례 분석](https://velog.io/@dodoyeon/%EB%93%80%EC%98%A4%EB%A7%81%EA%B3%A0%EB%8A%94-%EC%99%9C-%ED%95%98%ED%8A%B8%EB%A5%BC-%EC%97%90%EB%84%88%EC%A7%80%EB%A1%9C-%EB%B0%94%EA%BF%A8%EC%9D%84%EA%B9%8C-2025-UXUI-%EC%82%AC%EB%A1%80-%EB%B6%84%EC%84%9D) | [@dodoyeon](https://velog.io/@dodoyeon) |
| 2026.09.05 | [[개발 프로젝트 : AeroOps ] 다수의 드론을 연결하고 운영하는 관제 * 데이터 플랫폼을 시작합니다.](https://velog.io/@datagrizzly/%EA%B0%9C%EB%B0%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-AeroOps-%EB%8B%A4%EC%88%98%EC%9D%98-%EB%93%9C%EB%A1%A0%EC%9D%84-%EC%97%B0%EA%B2%B0%ED%95%98%EA%B3%A0-%EC%9A%B4%EC%98%81%ED%95%98%EB%8A%94-%EA%B4%80%EC%A0%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%ED%94%8C%EB%9E%AB%ED%8F%BC%EC%9D%84-%EC%8B%9C%EC%9E%91%ED%95%A9%EB%8B%88%EB%8B%A4) | [@datagrizzly](https://velog.io/@datagrizzly) |
| 2026.09.05 | [KoELECTRA와 Django를 활용한 심리상담 챗봇](https://velog.io/@snad3908/KoELECTRA%EC%99%80-Django%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4-%EC%B1%97%EB%B4%87) | [@snad3908](https://velog.io/@snad3908) |
| 2026.09.05 | [js 시간 카운트다운 만들기](https://velog.io/@mkyu0917/js-%EC%8B%9C%EA%B0%84-%EC%B9%B4%EC%9A%B4%ED%8A%B8%EB%8B%A4%EC%9A%B4-%EB%A7%8C%EB%93%A4%EA%B8%B0) | [@mkyu0917](https://velog.io/@mkyu0917) |
| 2026.09.05 | [IT 인프라](https://velog.io/@jinagayo/IT-%EC%9D%B8%ED%94%84%EB%9D%BC) | [@jinagayo](https://velog.io/@jinagayo) |
| 2026.09.05 | [Binwalk](https://velog.io/@junhoo04/Binwalk) | [@junhoo04](https://velog.io/@junhoo04) |
<!-- VELOG:END -->

<sub>6시간마다 [GitHub Actions](.github/workflows/velog-feed.yml)로 자동 갱신됩니다.
velog 전역 피드에는 한국어 개발 글 외에 중국어 스팸 계정 글이 섞여 들어오므로,
[수집 스크립트](scripts/velog-feed.mjs)에서 한글·한자 비율로 걸러냅니다.</sub>

---

## 통계

<p>
  <img height="165" src="https://github-readme-stats.vercel.app/api?username=wnstjqaodls&show_icons=true&hide_border=true&include_all_commits=true&count_private=true" alt="GitHub 통계" />
  <img height="165" src="https://github-readme-stats.vercel.app/api/top-langs/?username=wnstjqaodls&layout=compact&hide_border=true&langs_count=8" alt="주요 사용 언어" />
</p>
