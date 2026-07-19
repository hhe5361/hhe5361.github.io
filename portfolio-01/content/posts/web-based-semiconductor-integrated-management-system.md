---
title: "웹 기반 반도체 장비 통합 관리 시스템"
slug: "web-based-semiconductor-integrated-management-system"
featured: true
period: "2025.04 - 2026.08"
affiliation: "ICNS Lab"
coverImage: "/portfolio/web-semiconductor-management/system-architecture.png"
techStack:
  - Java
  - Spring Boot
  - Docker
  - WebRTC
  - HLS
  - Web
summary: "웹 기반 반도체 장비 모니터링 서비스의 스트리밍 구조와 장애 대응 로직을 개선한 유지보수 프로젝트입니다."
highlights:
  - "HLS 기반 다수 화면 스트리밍 ->  WebRTC 구조로 변경,  최대 30채널 스트리밍 안정화"
  - "잦은 네트워크 환경 변화로 인한 장애 ->  API 서버와 VNC 컴포넌트의 상태 추적 및 자동 복구 흐름 재설계, 시스템 안정화 기여"
  - "현장 적용 후 각종 추가 기능 및 이슈 대응 기여"
---

웹 브라우저에서 반도체 장비를 원격으로 모니터링하고 제어하는 서비스의 유지보수 프로젝트에 참여했습니다.

최대 30채널 멀티뷰와 싱글뷰 안정화, 스트리밍 장애 복구, 현장 환경에서의 상태 추적 정리 작업을 중심으로 진행했습니다.

## Project Summary

**Period** : 2025.04 - 2026.08

**Team Size** : 2명

**Tech Stack** : Java, Spring Boot, Docker, WebRTC, HLS, Web

**Description** :
웹 기반 장비 통합 관리 시스템에서 멀티뷰 스트리밍, API 서버 상태 관리, VNC 컴포넌트 장애 대응, 운영 환경 모니터링을 담당했습니다.

제한된 네트워크와 사용자 환경에서도 스트리밍이 안정적으로 유지되도록 구조를 개선했고, API 서버는 스트리밍 할당과 상태 관리, 컴포넌트 제어 중심으로 재정리했습니다.

![웹 기반 시스템 아키텍처](/portfolio/web-semiconductor-management/system-architecture.png)

## My Role
---

- API 서버 유지보수
- 멀티 스트리밍 안정화 작업
- VNC 컴포넌트와 API 서버 간 상태 관리 개선
- 장애 복구 로직 재설계 및 테스트 시나리오 검증
- 현장 운영 중 발생하는 스트리밍 이슈 대응

## Troubleshooting
---

## Issue 1. 최대 30채널 멀티뷰 스트리밍 병목

#### Situation

기존 솔루션은 최대 30개의 실시간 멀티뷰를 HLS 기반으로 제공하고 있었습니다.

브라우저가 다수의 HLS playlist와 TS segment를 계속 요청하는 구조라 HTTP 요청 수가 급격히 늘었고, 디코딩 부하까지 겹치면서 일부 브라우저에서는 화면이 끊기거나 지연되는 문제가 반복됐습니다.

#### Task

최대 30개의 실시간 영상을 안정적으로 제공할 수 있도록 스트리밍 구조 자체를 다시 설계해야 했습니다.

#### Action

HLS 기반 구조의 한계를 분석한 후 두 가지 방안을 검토했습니다.

 - HTTP/2 기반 HLS 전송 구조 개선
 - WebRTC 기반 실시간 스트리밍 전환

최종적으로 WebRTC 기반 구조를 선택하여 기존 VNC 컴포넌트를 두 개의 모듈로 분리했습니다.

 - **VNC to Files (C++)** : VNC 화면을 H.264로 인코딩하고 HLS 세그먼트를 생성
 - **Files to WebRTC (Go)** : 생성된 TS 파일을 읽어 WebRTC 스트림으로 변환하여 브라우저에 전달

 API 서버는 스트리밍 컴포넌트의 할당과 상태 관리만 담당하고, 영상 데이터는 브라우저와 스트리밍 컴포넌트가 직접 송수신하도록 구조를 변경했습니다.

![웹 아키텍처](/portfolio/web-semiconductor-management/issue1-flow.png)

#### Result

- 최대 30채널 밀티뷰 안정화
- 영상 끊김 현상 완화
- HTTP 요청은 최초 1회만 발생

---

## Issue 2. 스트리밍 상태 추적 및 복구 로직 부재

#### Situation

운영 중 특정 장비의 멀티뷰나 싱글뷰 화면이 보이지 않는 현상이 두드러지게 발생했습니다.

원인을 추적해보니 VNC 서버, VNC 컴포넌트, API 서버 사이의 네트워크 복구 로직이 약했고, API 서버가 각 device의 스트리밍 상태를 충분히 추적하지 못하고 있었습니다.

![상태 추적 아키텍처](/portfolio/web-semiconductor-management/issue2-overview.png)

#### Task

API 서버와 VNC 컴포넌트 사이의 장애 대응 복구 로직을 다시 설계하고, 실제 현장에서 일어날 수 있는 장애 상황을 재현해 검증해야 했습니다.

#### Action

API 서버의 스트리밍 할당 방식을 사용자별 고정 매핑과 DB 저장 방식으로 바꿔, 재시작이 발생해도 연결 상태를 다시 이어받을 수 있게 정리했습니다.

컴포넌트 등록, 해제, ping 응답을 기준으로 스트리밍 상태를 관리하고, 연결이 끊기면 자동으로 재시작을 시도하도록 복구 흐름을 단순화했습니다.

장애가 생겼을 때는 API 서버가 상태를 갱신하고, VNC component가 다시 연결될 수 있도록 스트리밍 재개 흐름을 맞췄습니다.

![VNC component register flow](/portfolio/web-semiconductor-management/component-register-flow.png)
![VNC component register recovery](/portfolio/web-semiconductor-management/component-register-recovery.png)

#### Result

아래의 각 시나리오에 대해 테스트를 진행했습니다.

1. 장비 VMC 장애 발생 , VNC 서버 강제 종료, VNC 서버 포트 차단, VNC 서버 케이블 해제
2. VNC 컴포넌트 장애 발생, VNC 컴포넌트 강제 종료, VNC 컴포넌트 포트 차단, VNC 컴포넌트 케이블 해제

테스트 결과, 모든 항목에서 예측 가능한 시나리오로 동작함을 확인했습니다.

또한 현장 배포 환경에서도 장애 복구 흐름을 추적할 수 있게 됐습니다.
