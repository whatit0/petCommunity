# 🌈 Pet Community Project

## ✍🏻 서비스 소개

Pet Community는 애완동물을 사랑하는 사람들이 서로 소통하고 정보를 공유할 수 있는 서비스입니다.

## ⛅️ 팀원 소개

- **Back End**
  - 유광진(팀장)([https://github.com/Youkwangjin](https://github.com/Youkwangjin))
  - 한국인([https://github.com/whatit0](https://github.com/whatit0))
  - 이성호([https://github.com/Imadeveloperrr](https://github.com/Imadeveloperrr))
- **Front End**
  - 유광진([https://github.com/Youkwangjin](https://github.com/Youkwangjin))
  - 한국인([https://github.com/whatit0](https://github.com/whatit0))
  - 이성호([https://github.com/Imadeveloperrr](https://github.com/Imadeveloperrr))

## ❄️ Project Architecture

![image](https://github.com/Imadeveloperrr/petCommunity/assets/117841714/418903c1-922c-40c3-87b4-8b777abc6aab)

## 🛠 Backend Tech Stack

- Spring boot
- MariaDB
- Firebase
- Nginx
- spring security + jwt token
- Swagger
- Docker
- Artillery
- Amazon Web Service

## 🌧 Backend Library

| Library                          | Description                                                 |
|----------------------------------|-------------------------------------------------------------|
| spring-boot-starter-web          | 웹 애플리케이션 개발을 위한 스프링 부트 스타터 (MVC)            |
| spring-boot-starter-data-jpa     | JPA를 사용하여 데이터베이스 작업을 쉽게 처리하기 위한 스타터     |
| spring-boot-starter-security     | 인증 및 권한 부여를 위한 스프링 기반의 보안 프레임워크          |
| spring security test             | 스프링 시큐리티 관련 테스트를 위한 라이브러리                   |
| jjwt-api                         | JWT (JSON Web Tokens) 생성 및 검증을 위해 사용                |
| lombok                           | 코드 간소화를 위해 Getter, Setter, Builder 등 자동 생성        |
| mariadb-java-client              | MariaDB 데이터베이스 연결을 위한 JDBC 드라이버                 |
| spring-boot-starter-test         | 스프링 부트 기반 테스트를 위한 스타터 키트                     |
| springdoc                        | REST API 문서화를 위한 SpringDoc OpenAPI UI 라이브러리        |

## 🛠 Frontend Tech Stack

- React
- Redux
- Bootstrap
- Naver Maps API
- 공공데이터 포털


## 🌧 Frontend Library

| Library                          | Description                                                 |
|----------------------------------|-------------------------------------------------------------|
| axios                            | HTTP 클라이언트, React에서 REST API 호출을 위해 사용          |
| React                            | 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리        |
| @reduxjs/toolkit                 | Redux의 표준 도구 모음으로, 상태 관리를 더 효율적으로 수행     |
| react-router-dom                 | SPA(Single Page Application) 라우팅을 위해 사용              |
| redux                            | 애플리케이션의 상태 관리를 위한 JavaScript 라이브러리          |
| react-redux                      | React와 Redux를 연결하기 위한 라이브러리                      |
| redux-thunk                      | 비동기 작업을 처리하기 위해 Redux 미들웨어로 사용              |
| styled-components                | CSS-in-JS 라이브러리, 컴포넌트 기반의 스타일링을 위해 사용     |
| react-bootstrap                  | Bootstrap 기반의 React 컴포넌트를 제공하는 라이브러리         |
| react-hook-form                  | React에서 폼 처리를 간편하게 할 수 있도록 도와주는 라이브러리  |
| react-icons                      | 다양한 아이콘을 React 컴포넌트로 사용할 수 있는 라이브러리     |
| bootstrap                        | CSS 프레임워크, 반응형 웹사이트를 쉽게 구축할 수 있도록 지원   |
| react-quill                      | React에서 사용할 수 있는 강력한 텍스트 에디터                 |
| firebase                         | 클라우드 기반 플랫폼, 인증, 데이터베이스, 구성 등을 지원       |
| jwt-decode                       | JWT를 디코드하여 사용자 인증 정보에 접근하는 데 사용           |
| react-js-pagination              | React에서 사용할 수 있는 페이지네이션 컴포넌트                |
| react-naver-maps                 | 네이버 지도 API를 React에서 사용할 수 있게 해주는 라이브러리   |


## 🔎 API

[Notion API Address](https://www.notion.so/bde8061d127c4b53af622ab558c4df71)

![API](https://github.com/Imadeveloperrr/petCommunity/assets/99321607/88916f39-c971-45aa-8194-1fad3055ea09)

## 🌈 주요 기능

1. Spring Security와 JSON Web Token(JWT)을 활용하여 안전하고 효율적인 사용자 인증 및 인가 시스템을 구축
2. Naver Map API를 통해 경기도권 동물병원 위치와 상세정보 파악
3. 건강 서비스를 통해 권장 칼로리, 기초 칼로리, BMI 지수 등을 계산하여 반려동물의 건강 상태 파악 및 효과적으로 관리
4. 미아 서비스를 통해 지도에 잃어버린 반려동물의 위치를 표시하고, 이를 다른 사용자와 공유함
5. 채팅 기능을 통해 다른 사용자와 실시간 소통


## 📋 ERD

![ERD(수정본)](https://github.com/Imadeveloperrr/petCommunity/assets/99321607/c23427cb-3de7-481b-84c1-77a33c64cbe1)

#### Firebase ERD
....

## ✅ 프로젝트 과부하 테스트


웹 애플리케이션의 성능을 평가하기 위해 수행된 부하 테스트 결과를 요약합니다. 이 테스트는 Artillery 부하 테스트 도구를 사용하여 시스템의 응답 시간, 처리량, 그리고 다양한 부하 상황에서의 성능을 측정하였습니다. 테스트는 로그인, 공지사항 조회, 게시판 사용 등 애플리케이션의 핵심 기능을 대상으로 하여 사용자 경험과 시스템 용량 계획에 필요한 데이터를 제공하고자 합니다.


![1](https://github.com/Imadeveloperrr/petCommunity/assets/99321607/e0c982d0-076a-4f95-9692-08649acc6586)


#### 테스트 도구 및 소프트 웨어

- 테스트 도구: Artillery
- 대상 애플리케이션: 로컬 개발 서버(’http://localhost:8080’)
- 데이터베이스: 테스트 전용 가상 데이터베이스

#### 테스트 시나리오

- 회원가입: jwt 토큰 생성 및 spring security 기능을 포함한 전체적인 성능 측정
- 로그인: 사용자 인증을 통해 시스템 접근성 평가
- 공지사항 조회: 공지사항 리스트 및 상세 페이지 로딩 성능 측정
- 게시판 사용: 게시글 조회, 작성, 수정, 삭제 등의 CRUD 작업 성능 평가
- 기타 기능: 미아 보고 서비스, 건강 정보 서비스 등 추가 기능의 성능 테스트

#### 부하 단계

- Warm up: 서서히 시스템을 부하에 적응시키는 초기 단계
- Ramp up load: 부하를 점차적으로 증가시켜 시스템의 한계를 탐색
- Sustained load: 일정 수준의 높은 부하를 지속적으로 유지
- Ramp down: 부하를 점차 줄여 시스템 회복 과정을 관찰

자세한 내용은 노션에서 확인가능합니다.

[Notion Artillery Report](https://www.notion.so/b781ddbcefe244349a43f3a983708267)


## ✅ 향후 프로젝트의 목표

## BoardServiceTest

### 'saveBoard` 테스트 케이스
- **목적**: 유효한 게시판 데이터로 `saveBoard`를 호출할 때 게시글이 정상적으로 저장되어야 합니다.
- **조건**:
  - `BoardDTO`에는 유효한 제목, 내용, 카테고리, 견종, 게시글 타입이 포함되어야 합니다.
  - 사용자는 시스템에 등록되어 있어야 합니다.
- **결과**: 게시글이 데이터베이스에 성공적으로 저장되어야 하며, 모든 필드가 정확하게 매핑되어야 합니다.

### 'saveBoardWithoutTitleThrowsException` 테스트 케이스
- **목적**: 제목 없이 saveBoard를 호출할 때 IllegalArgumentException이 발생해야 합니다.
- **조건**:
  - BoardDTO에 제목을 설정하지 않습니다.
  - 기타 필드는 유효한 값으로 설정합니다.
- **결과**:  IllegalArgumentException이 발생하며, "게시글 제목은 필수입니다." 메시지가 포함되어야 합니다.

### 'saveBoardWithNonExistentUserThrowsException` 테스트 케이스
- **목적**: 게시글 저장 시스템에 등록되지 않은 사용자(User) 정보를 사용하는 경우, 시스템은 IllegalArgumentException을 발생시켜야 합니다. 이 테스트는 사용자 정보가 데이터베이스에 존재하지 않을 때 적절한 예외 처리가 이루어지는지 검증합니다.
- **조건**:
  - BoardDTO 객체는 유효한 제목("유저 없음 테스트 제목")과 내용("유저 없음 테스트 내용")을 포함해 생성됩니다.
  - MemberRepository의 findByUserId 메소드는 Optional.empty()를 반환하도록 설정됩니다. 이는 시스템에 해당 사용자가 등록되어 있지 않음을 시뮬레이션합니다.
- **결과**:
  - 테스트는 BoardServiceImpl의 saveBoard 메소드를 호출할 때 IllegalArgumentException이 발생하는 것을 기대합니다.
  - 발생한 예외의 메시지는 "사용자를 찾을 수 없습니다."로, 시스템이 데이터베이스에서 사용자 정보를 찾지 못했음을 나타냅니다.
  - 이 테스트는 BoardServiceImpl이 사용자 정보가 없는 상태에서 게시글을 저장하려 할 때 적절한 예외 처리를 수행하는지 확인합니다.


![API Description](https://github.com/Imadeveloperrr/petCommunity/assets/99321607/b4def1f7-e474-40b7-a920-7106b18eadbf)
![Test Code Result](https://github.com/Imadeveloperrr/petCommunity/assets/99321607/bccb33cb-9fe3-448d-9256-34c50eed5de0)

  - 테스트 코드 작성하는 이유.

  - 서버를 실행하는 등의 시간을 절약할 수 있다.
  - 필요한 데이터를 미리 기입하고, 테스트가 끝나고 정리하는 등의 행동을 하지 않아도 된다.
  - 단위테스트의 경우 수십 ms 이기 때문에 테스트가 매우 빠르다.
  - 문서로서의 역할이 가능하다.
  - 깔끔한 인터페이스를 얻어낼 수 있다.
