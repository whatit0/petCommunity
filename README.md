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
- firebase
- Nginx
- react
- spring security + jwt token
- Swagger
- Docker
- EC2
- S3
- RDS

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
| swagger-ui                       | REST API 문서화를 위한 Swagger UI 라이브러리                  |
| springfox-swagger2               | Spring Boot 프로젝트에서 Swagger 2를 구현하기 위한 라이브러리  |
| AWS SDK for Java                 | AWS 서비스를 Java 애플리케이션에서 사용하기 위한 SDK            |
| spring-cloud-aws                 | AWS 서비스를 쉽게 통합할 수 있도록 지원하는 라이브러리          |

## 🛠 Frontend Tech Stack

- React


## 🌧 Frontend Library

| Library                          | Description                                                 |
|----------------------------------|-------------------------------------------------------------|
| axios                            | HTTP 클라이언트, React에서 REST API 호출을 위해 사용          |
| React                            | 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리        |
| react-router-dom                 | SPA(Single Page Application) 라우팅을 위해 사용              |
| redux                            | 애플리케이션의 상태 관리를 위한 JavaScript 라이브러리          |
| react-redux                      | React와 Redux를 연결하기 위한 라이브러리                      |
| redux-thunk                      | 비동기 작업을 처리하기 위해 Redux 미들웨어로 사용              |
| styled-components                | CSS-in-JS 라이브러리, 컴포넌트 기반의 스타일링을 위해 사용     |
| material-ui                      | React 컴포넌트 라이브러리, Material Design을 따르는 UI        |


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

![ERD](https://github.com/Imadeveloperrr/petCommunity/assets/99321607/2bdd0826-54d8-4917-9ad1-1bb2289a87b0)

## ✅ 프로젝트 과부하 테스트



## ✅ 향후 프로젝트의 목표

'saveBoard` 테스트 케이스

- **목적**: 유효한 게시판 데이터로 `saveBoard`를 호출할 때 게시글이 정상적으로 저장되어야 합니다.
- **조건**:
  - `BoardDTO`에는 유효한 제목, 내용, 카테고리, 견종, 게시글 타입이 포함되어야 합니다.
  - 사용자는 시스템에 등록되어 있어야 합니다.
- **결과**: 게시글이 데이터베이스에 성공적으로 저장되어야 하며, 모든 필드가 정확하게 매핑되어야 합니다.

'saveBoardWithoutTitleThrowsException` 테스트 케이스

- **목적**: 제목 없이 saveBoard를 호출할 때 IllegalArgumentException이 발생해야 합니다.
- **조건**:
  - BoardDTO에 제목을 설정하지 않습니다.
  - 기타 필드는 유효한 값으로 설정합니다.
- **결과**:  IllegalArgumentException이 발생하며, "게시글 제목은 필수입니다." 메시지가 포함되어야 합니다.

- 'saveBoardWithNonExistentUserThrowsException` 테스트 케이스

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
