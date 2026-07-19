---
title: "졸업 사정 진단표 분석 및 AI 기반 과목 추천 플랫폼"
slug: "graduation-audit-ai-course-recommendation"
date: "2025-07-31"
featured: true
projectType: "toy"
period: "2025.03 - 2025.07"
affiliation: "경희대학교"
teamSize: "6인 팀 프로젝트"
coverImage: "/portfolio/graduation-audit/course-cart.png"
techStack:
  - Kotlin
  - Spring Boot
  - Python
  - FastAPI
  - React
  - AWS
  - Docker
  - GitHub Actions
summary: "졸업 사정 진단표를 자동 분석하고 관심 분야에 맞는 과목 추천과 시간표 생성을 제공하는 클라우드 기반 웹 서비스입니다."
highlights:
  - "팀장으로 요구사항과 기술 의사결정을 주도하고 Spring Boot API 서버 구현"
  - "API·AI 서버의 부하 특성에 맞춰 AWS 인프라를 분리하고 배치 실행 구조 설계"
  - "GitHub Actions CI/CD를 구축해 반복 배포와 통합 테스트 소요 시간 단축"
---

학생들은 수강 신청 전에 졸업 사정 진단표를 확인해 졸업 요건 충족 여부와 필요한 과목을 직접 파악해야 합니다.

학번마다 졸업 요건과 교과과정이 달라 확인에 많은 시간이 들고, 관심 분야와 시간표까지 함께 고려해 과목을 선택하기 어렵다는 문제를 해결하고자 프로젝트를 시작했습니다.

## Project Summary

**Period** : 2025.03 - 2025.07

**Team Size** : 6명

**Contribution** : 40%

**Role** : Team Lead, Backend Engineer, Cloud Architect

**Tech Stack** : Kotlin, Spring Boot, Python, FastAPI, React, AWS, Docker, GitHub Actions

**Description** : 졸업 사정 진단표 PDF를 자동으로 분석하고, 사용자의 관심 분야를 반영한 과목 추천과 시간표 생성 기능을 제공하는 웹 서비스입니다.

## Service Overview
---

- 졸업 사정 진단표 PDF를 분석해 총 학점, 교양, 전공 영역별 충족 여부 제공
- 카테고리, 전공 분류, 과목명, 교수명 기반 과목 검색과 우선순위 장바구니 제공
- 선택 과목과 최소·최대 학점을 반영한 시간표 조합 자동 생성
- 자연어 선호 조건을 활용한 AI 기반 추천 시간표 필터링

![졸업 사정 진단표 업로드 및 분석](/portfolio/graduation-audit/audit-upload.png)

![과목 검색 및 장바구니](/portfolio/graduation-audit/course-cart.png)

![시간표 생성 결과](/portfolio/graduation-audit/timetable-result.png)

![자연어 기반 시간표 필터링](/portfolio/graduation-audit/ai-filter.png)

## Service Architecture
---

- Kotlin/Spring Boot API 서버와 Python/FastAPI AI 서버를 분리해 독립 배포 및 장애 전파 방지
- 서비스별 부하 특성에 맞는 EC2 자원 할당으로 운영 비용 조정
- EventBridge와 AWS Batch로 학기별 크롤링 작업을 실행해 상시 서버 비용 제거
- React 정적 리소스는 S3와 CloudFront로 제공해 API 서버 부하 분리

![서비스 구성 아키텍처](/portfolio/graduation-audit/service-architecture.png)

![AWS 인프라 아키텍처](/portfolio/graduation-audit/aws-architecture.png)

## My Role
---

### Team Lead

- 주요 기술 의사결정과 팀 내 아키텍처 리뷰
- API 명세, 데이터 흐름, 모듈별 책임 범위 정리

### Backend Engineer

- 과목 조회와 장바구니 CRUD API
- 시간표 생성 및 LLM 기반 필터링 API
- GitHub Actions 기반 CI/CD 파이프라인

### Cloud Architect

- AWS 인프라 설계와 자원 할당
- CloudFront와 S3 기반 정적 페이지 배포
- EventBridge와 Batch 기반 크롤링 실행 구조

## Troubleshooting
---

### Issue 1. 반복되는 수동 배포로 인한 통합 테스트 지연

#### Situation

프로젝트 후반부에는 API 서버, AI 서버, 프론트엔드, 크롤링 모듈을 AWS 환경에서 함께 검증해야 했습니다.

API 응답 형식과 서버 간 통신 방식이 자주 변경됐지만, EC2에 직접 접속해 수동 배포하는 방식 때문에 수정 내용을 확인하는 데 시간이 오래 걸렸습니다.

#### Task

코드 병합부터 실제 환경 배포까지의 반복 작업을 줄이고 통합 테스트 주기를 단축해야 했습니다.

#### Action

담당한 API 서버에 GitHub Actions 기반 CI/CD 파이프라인을 구축했습니다.

코드 병합 이후 빌드와 배포가 자동으로 수행되도록 구성해 개발자가 서버에 직접 접속해야 하는 과정을 제거했습니다.

#### Result

반복적인 수동 배포 작업을 줄였고, 기능 수정 후 실제 AWS 환경에서 검증하기까지의 시간을 단축했습니다.

---

### Issue 2. 모듈 간 데이터 형식과 책임 범위 불일치

#### Situation

6명의 팀원이 API 서버, AI 서버, 프론트엔드, 크롤링 모듈을 나눠 개발했습니다.

초기에는 각 모듈 구현에 집중하면서 통합 단계에서 API 응답 구조, 데이터 포맷, 서버 간 책임 범위에 대한 해석 차이가 드러났습니다.

#### Task

반복되는 수정 작업을 줄이면서 제한된 일정 안에 모든 모듈을 안정적으로 연동해야 했습니다.

#### Action

팀장으로서 기능 구현 전에 API 명세와 전체 데이터 흐름을 정의하고, 각 모듈의 책임 범위를 명확하게 나눴습니다.

새로운 기술을 도입할 때는 구현 난이도뿐 아니라 운영 비용, 안정성, 개발 기간을 함께 검토했습니다.

#### Result

팀원 간 해석 차이를 줄이고 통합 과정의 수정 범위를 예측할 수 있게 됐습니다.

기술 자체보다 팀이 함께 개발하고 운영할 수 있는 구조를 만드는 것이 중요하다는 점을 배웠습니다.

## Service Demo

- [졸업 사정 진단 및 과목 추천 데모](https://www.youtube.com/watch?v=nc_l_dOc03E)
- [시간표 생성 및 AI 필터링 데모](https://youtu.be/a6_J-9iLBvk)
