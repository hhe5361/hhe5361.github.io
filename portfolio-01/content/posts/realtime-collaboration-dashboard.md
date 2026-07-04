---
title: "Realtime Collaboration Dashboard"
slug: "realtime-collaboration-dashboard"
date: "2026-05-12"
featured: true
coverImage: ""
githubUrl: "https://github.com"
liveUrl: "https://example.com"
techStack:
  - React
  - Node.js
  - MongoDB
  - Socket.IO
summary: ""
---

실시간 협업 대시보드는 여러 사용자가 같은 워크스페이스에서 작업할 때 편집 상태, 알림, 활동 로그를 안정적으로 동기화하는 프로젝트입니다.

## Project Summary

---

**Period** : 2026.03 - 2026.05

**Team Size** : 1명

**Tech Stack** : React, Node.js, MongoDB, Socket.IO

**Description** : 백엔드는 Socket.IO와 MongoDB를 사용해 워크스페이스 단위로 이벤트를 분리했고, 클라이언트는 이벤트 타입별로 상태를 정규화해 필요한 변경만 화면에 반영하도록 구현했습니다.

## My Role

---

- Socket.IO 기반 실시간 이벤트 설계
- 워크스페이스별 사용자 presence 상태 관리
- 활동 로그 저장 구조와 조회 API 구현
- 중복 이벤트와 지연 이벤트를 처리하는 클라이언트 상태 흐름 정리

## Troubleshooting

### Issue 1. 접속자 상태가 실제보다 늦게 반영됨

- **Situation**: 사용자가 브라우저를 닫거나 네트워크가 끊겼을 때 presence 상태가 계속 active로 남는 문제가 있었습니다.
- **Task**: 사용자의 접속 상태를 더 정확하게 반영하면서도 짧은 네트워크 지연에는 과도하게 반응하지 않아야 했습니다.
- **Action**: heartbeat 이벤트와 timeout 기준을 분리하고, disconnect 직후 바로 제거하지 않고 짧은 grace period를 둔 뒤 상태를 갱신했습니다.
- **Result**: 일시적인 네트워크 흔들림으로 인한 깜빡임이 줄었고, 실제 이탈 사용자는 안정적으로 idle 또는 offline 상태로 전환됐습니다.

### Issue 2. 같은 활동 로그가 중복 저장됨

- **Situation**: 빠르게 연속 편집이 발생하면 동일한 의미의 이벤트가 여러 번 저장되어 활동 로그가 불필요하게 길어졌습니다.
- **Task**: 로그의 추적 가능성은 유지하면서 사용자가 읽기 어려운 중복 이벤트를 줄여야 했습니다.
- **Action**: 이벤트 생성 시 `workspaceId`, `userId`, `eventType`, `targetId` 기준으로 짧은 시간 안에 발생한 이벤트를 병합하는 규칙을 추가했습니다.
- **Result**: 활동 로그의 노이즈가 줄었고, 사용자는 중요한 변경 흐름을 더 빠르게 파악할 수 있게 됐습니다.

### Issue 3. 소켓 이벤트 타입이 늘어나며 디버깅이 어려워짐

- **Situation**: 기능이 추가될수록 이벤트 이름과 payload 구조가 분산되어, 어느 화면에서 어떤 이벤트를 소비하는지 추적하기 어려웠습니다.
- **Task**: 이벤트 구조를 정리해 프론트엔드와 백엔드가 같은 계약을 기준으로 개발할 수 있어야 했습니다.
- **Action**: 이벤트 타입을 도메인별로 분리하고, 각 이벤트의 payload 타입과 필수 필드를 문서화했습니다. 클라이언트에는 이벤트 핸들러 매핑 레이어를 별도로 두었습니다.
- **Result**: 신규 이벤트를 추가할 때 수정 범위가 명확해졌고, 잘못된 payload로 인한 런타임 오류를 빠르게 찾을 수 있었습니다.

### Issue 4. 실시간 알림이 많아 화면 집중도가 떨어짐

- **Situation**: 모든 업데이트를 즉시 알림으로 표시하자 작업 중인 사용자가 계속 방해를 받는 문제가 있었습니다.
- **Task**: 중요한 알림은 놓치지 않되, 반복적이거나 낮은 우선순위의 알림은 화면을 덜 방해하도록 조정해야 했습니다.
- **Action**: 알림을 우선순위별로 나누고, 낮은 우선순위 이벤트는 배지와 활동 로그에만 반영했습니다. 같은 대상의 알림은 일정 시간 동안 하나로 묶었습니다.
- **Result**: 화면의 시각적 소음이 줄었고, 사용자는 현재 작업을 유지하면서도 필요한 업데이트를 확인할 수 있게 됐습니다.
