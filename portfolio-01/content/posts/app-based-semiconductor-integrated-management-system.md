---
title: "데스크탑 앱 | 실시간 장비 관제 시스템 유지보수"
slug: "app-based-semiconductor-integrated-management-system"
date: "2026-08-30"
featured: true
projectType: "work"
period: "2025.09 - 2026.08"
affiliation: "ICNS Lab"
coverImage: "/portfolio/realtime-monitoring/system-architecture.png"
techStack:
  - C#
  - .NET / WPF / ASP.NET Core
  - RTSP
  - VNC / LibVNC
  - SQLite
summary: "Window Desktop 앱 기반 실시간 반도체 장비 제어, 모니터링 및 녹화 조회 전체 시스템에 대한 유지보수를 진행하였습니다."
highlights:
  - "VNC Viewer 재캡처 구조를 LibVNC, FFmpeg, MediaMTX 기반 RTSP 파이프라인으로 개편하여 스트리밍 성능 최적화"
  - "클라이언트측 단일 채널 기준, CPU 92.47%, 메모리 84.61%, 네트워크 수신량 95.13% 개선"
  - "LibVLC를 자체 FFmpeg 디코딩 파이프라인으로 교체해 25채널 CPU 사용량 96.80% 개선 및 최대 60채널 재생 검증"
---

## 프로젝트 개요
- **==Period==** : 2025.08 - 2026.08
- **==Client Environment==** : 폐쇄망, Windows, 4 Core CPU·8GB RAM VDI
- **==Tech Stack==** : C#, .NET / WPF / ASP.NET Core, FFmpeg, VNC, LibVNC, RTSP, SQLite
**==Contribution==** : 60%

반도체 생산 현장의 장비와 CCTV 화면을 실시간으로 수집하고, Windows 클라이언트에서 다중 모니터링과 원격 제어를 제공하는 관제 시스템 유지보수 작업을 진행했습니다. 

주요 모듈은 크게 주요 API를 담당하는 **마스터 서버**, 장비 영상 및 CCTV를 녹화 및 스트리밍하는 **미디어 서버**, 녹화 영상을 보관 및 조회를 제공하는 녹화 서버, **클라이언트 앱**으로 구성되어 있습니다.
각 반도체 장비에는 VNC 서버가 가동되어 모듈에 RFB 프로토콜을 통해 화면을 제공하고, CCTV는 RTSP를 통해 모듈에 영상을 제공합니다. 
클라이언트 앱에서는 주로 반도체 장비 녹화 조회 및 다중 스트리밍 기능을 지원합니다.    

외부망이 차단된 폐쇄망과 **하드웨어 가속 장치가 없는 4Core 8GB RAM VDI 클라이언트 환경**에서도 안정적으로 동작하도록 보장하는 것이 주요 안건이었습니다.
이에 기존 미디어 서버와 클라이언트 사이의 스트리밍 구조를 개선해 성능 최적화 작업을 진행했습니다. 이외에는 현장 이슈 대응 및 추가 기능 요구 사항에 대한 유지보수를 주로 진행했습니다.

### 프로젝트 기능 구조도

![프로젝트 기능 구조도](/portfolio/realtime-monitoring/system-architecture.png)

### 시스템 아키텍처

![시스템 아키텍처](/portfolio/realtime-monitoring/system-architecture-detail.png)

## 주요 담당 업무

- 미디어 서버의 기존 장비 스트리밍 및 녹화 파이프라인 분석 및 개선
- 저사양 클라이언트 환경을 고려한 다중 스트리밍 디코딩·렌더링 최적화
- CPU, 메모리, GPU, 네트워크 사용량 프로파일링과 개선 전후 검증
- 미디어 서버 및 파일 서버, 클라이언트 앱 유지보수 및 운영 이슈 대응

## Troubleshooting

---

### Issue 1. 미디어 서버 스트리밍 및 녹화 성능 개선

#### Problem
- VNC Viewer 렌더링 후 데스크톱 재캡처 기반 녹화 구조 -> 불필요한 렌더링 자원 소모
- CCTV 모든 채널에 FHD·10fps 단일 프로파일 적용 구조 -> 다중 화면 재생 시 원본 해상도 CCTV 재생, 이로 인해 클라이언트 부하 가속 


**클라이언트 측으로부터 보고 받은 현상**
- 클라이언트 CPU 사용률이 사용자 환경 기준 80%까지 상승
- 일부 화면 블랙아웃과 클라이언트 강제 종료
- 장비 영상 끊김
- 미디어 서버 CPU와 메모리 사용량 불안정

![기존 미디어 서버의 병목 원인 분석](/portfolio/realtime-monitoring/media-server-analysis.png)

#### Analyze

- **==장비 화면 스트리밍 시에 VNC 서버를 사용하는 문제==**

-> VNC의 RFB 프로토콜은 변경된 화면 영역만 framebuffer update로 전달하기 때문에, 화면 변화가 적은 반도체 장비 환경에서는 프로토콜 자체가 직접적인 병목은 아니라고 판단했습니다.

다만 미디어 서버의 VNC Server에 여러 클라이언트가 동시에 연결될 경우, 클라이언트별 화면 상태 관리와 인코딩·전송 비용이 누적되면서 지연이 증가했습니다. 이는 보고 받은 현상 중 장비 화면의 지연 및 블랙아웃 현상과 연관될 가능성이 있었습니다.

또한 미디어 서버에서 사용중이던 TightVNC Server의 내부 framebuffer 처리 및 다중 클라이언트 처리 방식을 직접 제어하기 어려웠습니다. 이는 성능 원인을 세밀하게 분석하거나 스트리밍 환경에 맞게 최적화하기 어렵다는 한계가 있었습니다.

- **==VNC Viewer 렌더링부터 호스트 화면 재캡처까지 이어지는 불필요한 자원 소모==** 

-> 미디어 서버는 장비 VNC 서버로부터 화면을 받아 이를 렌더링 후, VNC 서버를 통해 렌더링된 화면을 다시 전송하는 구조였습니다. 이러한 구조에서 미디어 서버의 불필요한 렌더링 자원이 소모되고, 또 불필요한 프레임 복사가 발생한다고 생각했습니다. 

-> 장비 화면 녹화를 위해 별도의 ffmpeg 프로세스가 다시 한 번 렌더링된 호스트 화면을 gdigrab 옵션을 통해 재캡처하는 구조가 있었습니다. 이러한 녹화 구조는 불필요한 메모리 및 CPU를 사용한다고 판단했습니다.



- **==단일 고해상도 프로파일 다중 화면 스트리밍 문제==**

-> RTSP를 통해 받은 CCTV 영상의 경우, 미디어 서버에서 원본 해상도 + 24 프레임으로 RTSP를 통해 재송출되는 구조였습니다. 하지만 클라이언트에서는 최대 60대의 화면을 동시에 grid 형태로 띄우는 구조였습니다. 때문에 원본 해상도 + 24프레임은 다중 화면 스트리밍 시에 클라이언트의 H.264 디코딩 부하를 증가 시키며, 높은 네트워크 사용률, 메모리 사용률의 원인으로 작용할 것이라 판단했습니다.


![개선 전 미디어 서버 스트리밍·녹화 흐름](/portfolio/realtime-monitoring/media-server-before.png)

#### Action

- VNC Viewer 구조 제거 및 LibVNC Client 기반 장비 프레임을 백그라운드에서 수집 구조로 전환
- 장비 화면 영상 스트리밍 시에 VNC가 아닌 RTSP 프로토콜 사용으로 전환
- MediaMTX Server runOnReady 옵션을 통해 원본 스트림 이외 추가적인 480p Sub-stream RTSP 제공
- 단일 화면 스트리밍 시에는 메인 스트림을, 다중 화면 스트리밍 시에는 서브 스트림을 사용하도록 클라이언트 로직 변경
- MediaMTX record 기능 기반 등록된 RTSP 영상 녹화. -> VNC Viewer Rendering·`gdigrab` 재캡처 단계 제거

![개선 전 미디어 서버 스트리밍·녹화 흐름](/portfolio/realtime-monitoring/media-server-before.png)
![개선 후 LibVNC·FFmpeg·MediaMTX 기반 흐름](/portfolio/realtime-monitoring/media-server-after.png)

#### 성능 모니터링 기준

- 미디어 서버 : 단일 유저가 5CH 스트리밍 연결, 각 3회 반복 측정 후 평균 도출,  실제 운영 서버 스펙 기준 CPU·Memory·GPU 3D Engine 사용량 측정

- 클라이언트 : 단일 유저가 1CH 스트리밍 연결, 개발 환경 컴퓨터 기준 CPU·Memory·Network 수신량 측정

#### Result

| 미디어 서버 지표 | 개선 전 | 개선 후 | 개선률 |
| --- | ---: | ---: | ---: |
| CPU 평균 | 34.89% | 31.21% | 10.53% 감소 |
| Memory 평균 | 684.99MB | 470.09MB | 31.37% 감소 |
| GPU 3D Engine | 12.47% | 0.44% | 96.44% 감소 |

| 클라이언트 지표 | 개선 전 | 개선 후 | 개선률 |
| --- | ---: | ---: | ---: |
| CPU 평균 | 2.58% | 0.19% | 92.47% 감소 |
| Memory 평균 | 946.22MiB | 145.65MiB | 84.61% 감소 |
| Network 수신량 | 5.44MB/s | 0.26MB/s | 95.13% 감소 |

---

### Issue 2. 클라이언트 다중 화면 스트리밍 성능 최적화

#### Problem

- 미디어 서버 개편 후에 25채널 이상 서브 스트림 RTSP 재생 시 클라이언트 CPU 사용량 비선형 급증 현상 포착
- 장비 및 CCTV 화면 영상 끊김 및 강제 종료 반복 상황 발생
- 초기 프레임 지연 1.7~2.38초 발생

#### Analyze

- 클라이언트 앱에서 5, 10, 20, 25채널별 스트리밍 재생 후  Perfmon을 통해 CPU Usage 측정 -> 25채널부터 비선형적으로 CPU Usage가 급증하는 현상 파악

- Visual Studio Profiling을 통해 대략적인 CPU 부하 경로 파악 -> Native LibVLC 처리 구간의 CPU 사용량 집중되는 것을 확인

- LibVLC의 다중 스트림 렌더링 환경에서 CPU·메모리 사용량이 급증하는 유사 이슈를 확인

![LibVLC 사용 시 채널 증가에 따른 CPU 급증](/portfolio/realtime-monitoring/client-cpu-before.png)
![Visual Studio Profiler로 확인한 Native LibVLC 병목](/portfolio/realtime-monitoring/client-profiler.png)

#### Action

- LibVLC 라이브러리 제거 및 FFmpeg `libavcodec` 기반 Custom Decoding Loop 구현
- 디코딩된 프레임을 WPF의 `WriteableBitmap` 기반 렌더링 구조로 구현
- 반복 테스트를 통한 초기 지연 감소를 위한 초기 분석 옵션 `probesize=32`, `analyzeduration=100000` 조정
- 단계적 채널 수 증가를 통한 최대 60채널 동시 재생 안정성 검증

#### Result

- 초기 재생 지연 1.7~2.38초 → 0.5초 수준 감소
- 4 Core CPU·8GB RAM VDI 환경 최대 60채널 재생 검증

#### 성능 모니터링 기준

- **측정 환경** : 소프트웨어 디코딩 사용, 개발 환경 컴퓨터에서 진행
- **측정 조건** : 스트리밍 5·10·20·25·60채널 재생
- **측정 항목** : Perfmon을 통해 클라이언트 프로세스 Cpu Usage 항목 측정

| 채널 수 | 평균 CPU 사용량 개선률 |
| --- | ---: |
| 5채널 | 38.50% |
| 10채널 | 86.40% |
| 25채널 | 96.80% |

![FFmpeg 전환 후 60채널까지의 CPU 사용량 추이](/portfolio/realtime-monitoring/client-cpu-after.png)

