---
title: "졸업 사정 진단표 분석 및 AI 기반 과목 추천 플랫폼"
slug: "graduation-audit-ai-course-recommendation"
date: "2025-06-30"
featured: true
projectType: "toy"
period: "2025.03 - 2025.06"
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

summary: "경희대학교 재학생의 졸업 사정 진단표를 자동 분석하고 관심 분야에 맞는 과목 추천과 시간표 생성을 제공하는 클라우드 기반 웹 서비스입니다."
highlights:
  - 팀장 역할을 맡아 전체 프로젝트 일정 관리 및 각 팀의 의사결정 사항 조율 담당
  - DataBase 구조 모델링 및 ERD 설계 담당
  - Backend(SpringBoot)으로 참여하여 시간표 관련 CRUD 및 졸업 사정 진단표 파싱 API 구현 담당
  - "API·AI 서버의 부하 특성에 맞춰 AWS 인프라를 분리하고 배치 실행 구조 설계 및 구축"
  - "GitHub Actions CI/CD를 구축해 반복 배포와 통합 테스트 소요 시간 단축"
---

## Project Summary

**==Period==** : 2025.03 - 2025.06

**==Team Size==** : 6명

**==Contribution==** : 35%

**==Role==** : Team Lead, Backend Engineer, Cloud Architect

**==Tech Stack==** : Kotlin, Spring Boot, Python, FastAPI, React, AWS, Docker, GitHub Actions


매학기 학생들은 수강 신청 전에 졸업 사정 진단표를 확인해 졸업 요건 충족 여부와 필요한 과목을 직접 파악 해야 했습니다.하지만 학번마다 졸업 요건과 교과과정이 달라 확인에 많은 시간이 들고, 관심 분야와 시간표 겹침 여부까지 함께 고려해야 하기 때문에 매번 시간표 선정에 많은 시간을 할애한다는 문제를 해결하고자 프로젝트를 시작했습니다.


**==Service Architecture==** 
- API 서버(2인) : 졸업사정진단표 PDF 파싱 및 사용자 이수정보 관리, 장바구니·과목 검색, 시간표 생성·조회·수정 API 개발 및 AI 추론 서버 연동
- 프론트 엔드(1인) : 웹 UI/UX 및 백엔드 API 연동 개발 진행
- 크롤링 모듈(1인) : 매학기 개설 강좌 파싱 및 강좌 별 ai_description 생성 후 RDS 저장
- AI 추론 서버(2인) : 개설된 강좌 설명에서 핵심 키워드를 추출하고 FastText 임베딩 기반 유사도를 계산하여, 사용자 관심 키워드와 유사한 강좌를 반환하는 추천 API 개발

  ![서비스 아키텍처](/portfolio/graduation-audit/service-architecture.png)
  *서비스 전체 구성도*


**==AWS Cloud Deploy Architecture==** 

  - API 서버와 AI 추론 서버를 독립 배포하여 장애를 격리하고 서비스별 독립 확장이 가능하도록 구성
  - 서비스별 부하 특성에 맞는 EC2 자원 할당으로 운영 비용 조정
  - EventBridge와 AWS Batch를 활용해 학기별 크롤링 작업을 필요 시점에만 실행하여 유휴 컴퓨팅 비용 절감
  - React 정적 리소스를 S3에 배포하고 CloudFront를 통해 제공하여 정적 콘텐츠 트래픽을 API 서버와 분리
  - Multi-AZ 기반 API/AI 서버 이중화 및 Auto Scaling으로 가용성 확보
  - RDS와 API·AI 서버를 Private Subnet에 배치하여 외부 직접 접근을 제한

  ![AWS 인프라 아키텍처](/portfolio/graduation-audit/aws-architecture.png)
  *AWS 배포 인프라 구성도*

---

## Service Overview

- 졸업 사정 진단표 PDF를 분석해 총 학점, 교양, 전공 영역별 충족 여부 제공
- 카테고리, 전공 분류, 과목명, 교수명 기반 과목 검색과 우선순위 장바구니 제공
- 선택 과목과 최소·최대 학점을 반영한 시간표 조합 자동 생성
- 자연어 선호 조건을 활용한 AI 기반 추천 시간표 필터링

![졸업 사정 진단표 업로드 및 분석](/portfolio/graduation-audit/audit-upload.png)

![과목 검색 및 장바구니](/portfolio/graduation-audit/course-cart.png)

![시간표 생성 결과](/portfolio/graduation-audit/timetable-result.png)

![자연어 기반 시간표 필터링](/portfolio/graduation-audit/ai-filter.png)

---
## My Role

### Team Lead

- 전체 프로젝트 일정 관리 및 회의 주도
- 각 팀의 의사결정 사항 조율

### Backend Engineer
- DataBase ERD 구조 설계 및 모델링 담당
- 시간표 관련 CRUD API 구현 담당
- 졸업 사정 진단표 PDF 파싱 API 구현 담당
- GitHub Actions 기반 CI/CD 파이프라인 구축

### Cloud Architect

- AWS 인프라 설계 검증 단계 진행
- AWS 전체적인 인프라 구축 및 역할 생성 후 자원 분배 담당

---


## Service Demo

- [졸업 사정 진단 및 과목 추천 데모](https://www.youtube.com/watch?v=nc_l_dOc03E)
- [시간표 생성 및 AI 필터링 데모](https://youtu.be/a6_J-9iLBvk)
