---
title: "웹 | 실시간 장비 관제 시스템 유지보수"
slug: "web-based-semiconductor-integrated-management-system"
date: "2026-08-30"
featured: true
projectType: "work"
period: "2025.03 - 2026.08"
affiliation: "ICNS Lab"
coverImage: "/portfolio/web-monitoring/system-architecture.png"
techStack:
  - Java
  - Spring Boot
  - C++
  - Go
  - WebRTC
  - WS
  - Docker
  - React
  - MySQL
summary: "웹 기반 실시간 반도체 장비 제어, 실시간 장비 화면 스트리밍 조회 기능을 중점적으로 시스템에 대한 유지보수를 진행하였습니다."
highlights:
  - "서버 산출물을 Docker 이미지로 표준화해 신규 배포 가이드를 16페이지에서 2페이지로 축소"
  - "API 서버와 VNC 컴포넌트의 장애 상태·재접속 흐름을 재설계, API 서버 상태 전이도 흐름 구현 후 6개 장애 시나리오 검증"
  - "합성 스트리밍 방식 제안, PoC에서 클라이언트 CPU 83.30%, 서버 GPU 인코더 사용량 71.10% 감소"
---

## 프로젝트 개요
- **==Period==** : 2025.03 - 2026.08
- **==Environment==** : 폐쇄망, Linux 서버, 4 Core CPU·8GB RAM 클라이언트
- **==Tech Stack==** : Java, Spring Boot, C++, Go, React, WebRTC, Docker, MySQL
**==Contribution==** : 30%

반도체 생산 현장의 장비 화면을 실시간으로 수집하고, 웹에서 장비 원격 제어와 단일·다중 화면 스트리밍을 제공하는 관제 시스템의 유지보수 및 기능 개선을 수행했습니다.

시스템은 주요 비즈니스 API를 담당하는 **Java/Spring Boot API 서버**와 영상 수집·변환·송출을 담당하는 **C++/Go 기반 스트리밍 컴포넌트**로 구성되어 있습니다.


- API 서버는 사용자, 채팅, 로그, 장비 및 스트림 상태 관리 기능을 제공하며, VNC 컴포넌트와 사전에 정의한 Stream Event를 기반으로 각 장비의 스트리밍 상태를 추적하여 클라이언트에 전달합니다.

- 각 반도체 장비에서는 VNC Server가 동작하며, C++ 기반 VNC Proxy가 RFB 프로토콜을 통해 장비 화면의 framebuffer를 수신합니다. 수신한 화면은 인코딩 후 파일 형태로 저장되며, 이후 Go 기반 스트리머가 이를 WebRTC로 송출합니다. 하나의 VNC Component는 최대 60대의 장비 스트리밍을 처리하도록 구성되어 있습니다.

- 웹 클라이언트에서는 WebSocket 기반 VNC 연결을 통해 장비 화면을 원격 제어하고, WebRTC를 이용해 여러 장비의 화면을 동시에 모니터링할 수 있습니다.


![웹 기반 장비 모니터링 시스템 아키텍처](/portfolio/web-monitoring/system-architecture.png)

## 주요 담당 업무

- API 서버 유지보수 및 신규 기능 개발
- 폐쇄망 배포 과정의 컨테이너 패키징 구축
- 분산 컴포넌트 현장에의 스트림 상태 추적 및 장애 복구 흐름 설계, 상태 전이도 구현
- 저사양 클라이언트를 위한 다중 화면 합성 스트리밍 PoC와 성능 검증

## Troubleshooting

---

### Issue 1. 폐쇄망 수동 배포와 서버별 환경 편차

#### Problem
초기 유지보수 작업을 위해 프로젝트를 전달 받았을 때, 약 17페이지 분량의 배포 가이드 문서를 받았습니다. 이러한 배포는 매번 해당 시스템이 신규 배포될 때 반복되어야 하는 과정이었습니다. 

- API/Web 서버: Nginx 설치·설정, JRE 구성, 서버 실행, HTTPS 인증서 발급·등록을 서버별 수동 수행
- VNC Component 서버: 의존성 설치, 실행 스크립트 구성, 인증서 설정을 개별 작업으로 수행

#### Analyze

- 충분한 사전 지식이 필요한 16페이지 분량의 배포 가이드 -> 배포 담당자들의 현실적 어려움
- 수동 파일 복사·프로세스 실행 방식으로 인한 운영 장애 발생 우려
- 서버별 환경 편차로 개발 환경에서 동일한 배포 상태 재현 어려움

#### Action

- API/Web 서버와 VNC Component 서버의 Docker 컨테이너 패키징
- Multi-stage build 기반 빌드·런타임 환경 분리 및 이미지 경량화
- Supervisord 기반 컨테이너 내부 프로세스 일괄 기동·상태 관리
- 서버 설정 파일 외부 주입으로 이미지 재빌드 없는 환경 변경
- 인증서 발급·등록 과정의 배포 스크립트 자동화

![API 서버와 VNC 컴포넌트 서버의 Docker 패키징 아키텍처](/portfolio/web-monitoring/docker-architecture.png)

#### Result

- 전달 산출물을 Docker 이미지로 표준화
- 신규 배포 절차를 **이미지 로드 → 설정 주입 → 컨테이너 실행**으로 단순화
- 배포 가이드 16페이지 → 2페이지 축소 후 전달
- 운영 서버별 환경 편차 제거 및 동일한 배포 환경 재현

---

### Issue 2. 분산 스트리밍 장애 감지 및 복구

#### Problem

- 장비 VNC 서버, VNC Component, API 서버 사이 장애 발생 시 저장된 스트림 상태와 실제 상태 불일치 발생 문제
- 이로 인해 사용자들은 스트리밍 장애 발생 시, 어떤 원인으로 장애 상황인지를 파악하기 어려운 상황 발생
- 폐쇄망 특성상 즉시 현장 대응이 어려워 시스템 안에서 장애 원인과 복구 과정 추적이 필요한 상황


![컴포넌트 장애 전파와 기존 복구 흐름 분석](/portfolio/web-monitoring/fault-analysis.png)


#### Analyze

VNC Component의 경우 팀원이, API Server의 경우 제가 맡아 각각 스트림 상태 추적 및 복구 로직을 정리하여 설계 방향성을 논의 하였습니다. 

**==VNC Component 측 : ==** (팀원 담당)

 장비 연결 오류 시 스트림 종료, 자체 재접속 로직 부재로 인하여 짧은 네트워크 장애 상황에도 스트림이 중단되는 현상 발생 

**==API Server 측 : ==**

1) 정상 종료와 장애 종료를 모두 `STREAM_CLOSE` 이벤트로 처리해 원인 구분 불가, 사용자 측면에서는 정상 종료/에러로 인한 종료인지를 구분하기 힘들 것이라 판단

2) 중지된 스트림이 10분 주기의 Scheduler를 통해 복구 되는 상황 -> 이로 인해 실제 서비스 장애 상황이 발생해도 묵살되는 상황이라 판단


![개선 전 API 서버 스트림 상태 전이도](/portfolio/web-monitoring/stream-state-before.png)

#### Action

각 모듈에서 책임 분리를 확실히 하기 위해, 팀원과 논의 후 API 서버의 스트림 상태 추적 이벤트 상태 머신을 재정의하였습니다. 이후 팀원이 VNC 컴포넌트 측에는 에러 상황 발생 시, 원인 로그 구축 및 이벤트 패치 흐름을, 저는 API 서버 측에는 상태 추적에 따른 분기 로직을 구현했습니다.


**==VNC Component 측 : ==** (팀원 담당)

1) 스트림 에러 상황 발생 시, API 서버로 해당 스트림 `ERROR_STREAM_RETRY` 이벤트 패치, 이후 Exponential Backoff를 시도

2) Backoff 시도 후에도 VNC 연결이 되지 않을 경우, `ERROR_STREAM_CLOSE` 아벤트 패치 후 자원 정리.

![VNC Component 스트리밍 재접속 흐름](/portfolio/web-monitoring/component-reconnect-flow.png)

**==API Server 측 : ==**

1) 정상 종료와 장애 종료를 구분하는 `ERROR_STREAM_CLOSE` 이벤트 추가 및 상태 흐름 정의 및 구현

2) VNC Component 재접속·재시도 시 `ERROR_STREAM_RETRY` 이벤트를 API 서버에 전달하는 상태 흐름 정의 및 구현

3) `ERROR_STREAM_CLOSE` 이벤트로 인해, 스트림이 종료되었을 경우, 사용자에게 해당 상황 보고

![API 서버 스트림 상태 전이도 개선안](/portfolio/web-monitoring/api-state-after.png)

#### Result

총 6개의 장애 시나리오를 설계하고 실험하였습니다.

| 구분 | 테스트 시나리오 | 복구 결과 |
| --- | --- | --- |
| 장비 VNC 장애 | 장비 VNC 서버 강제 종료 | 통과 |
| 장비 VNC 장애 | 장비 VNC 서버 포트 차단 | 통과 |
| 장비 VNC 장애 | 장비 VNC 서버 랜선 해제 | 통과 |
| VNC Component 장애 | VNC Component 강제 종료 | 통과 |
| VNC Component 장애 | VNC Component 포트 차단 | 통과 |
| VNC Component 장애 | VNC Component 랜선 해제 | 통과 |


- 각 컴포넌트의 스트림 상태와 장애 원인 추적 가능
- 폐쇄망에서 서버·네트워크 장애 발생 시 복구 과정 예측 가능

---

### Issue 3. 다중 화면 합성 스트리밍 PoC

#### Problem

- 60채널 멀티뷰 요청 시 브라우저가 최대 60개의 H.264 스트림을 각각 디코딩하며 발생하는 클라이언트 병목 문제
- 당시 클라이언트는 4Core 8GB 램의 별도의 하드웨어 디코딩이 없는 환경이었기에 성능 최적화를 통해 시스템 안정성을 도모하고자 함
- 기존 구조는 VNC Component 서버와 60개의 개별 스트림을 H.264로 인코딩 후 WebRTC Session을 각각 연결하는 구조

#### Analyze

- 하드웨어 디코더가 없는 저사양 클라이언트에서 다중 H.264 스트림 디코딩으로 CPU 부하 증가
- VNC Component가 스트리밍 요청이 없어도 채널별 최신 프레임을 인코딩해 파일로 저장하기 때문에 상시 GPU 자원 사용
- 다수의 WebRTC 연결이 세션 관리와 협상 과정의 네트워크 스택 부하 증가

#### Action

- 다중 Grid 요청 시 VNC Component 서버에서 각 채널의 raw frame을 `n × m` Grid로 합성하는 Ondemand Composition Stream 방식 제안 및 PoC 구현
- 최대 60개 화면 단일 화면 인코딩 방식으로 변경
- 단일 WebRTC Session으로 브라우저에 합성 스트리밍 전달

  ![개선 전 채널별 인코딩과 WebRTC 세션 구조](/portfolio/web-monitoring/composition-before.png)
  ![개선 후 단일 합성 화면과 WebRTC 세션 구조](/portfolio/web-monitoring/composition-after.png)



  ![6×5 Grid 합성 스트리밍 PoC 결과 화면](/portfolio/web-monitoring/composition-demo.png)

#### 성능 모니터링 기준

- **공통 측정 조건** : 단일 사용자, 30채널 스트리밍, 5분 간격 3회 측정
- **VNC Component 서버** : 서버 CPU·Memory·GPU Encoder Util 평균 변화 측정
- **Client** : 4 Core CPU·8GB RAM Linux/Chrome VM에서 CPU·Memory 평균 변화 측정

#### Result

| VNC Component 서버 지표 | 개선율 |
| --- | ---: |
| CPU Usage (mean) | 67.30% 감소 |
| Memory (mean) | 48.60% 감소 |
| GPU Encoder Util (mean) | 71.10% 감소 |

| Client 지표 | 개선율 |
| --- | ---: |
| CPU Usage (mean) | 83.30% 감소 |
| Memory (mean) | 10.20% 증가 |
