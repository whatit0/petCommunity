package com.example.petcommunity.security.jwt.admin;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
// 생성한 accessToken, refreshToken을 클라이언트에게 보내주기 위해 DTO 클래스 작성
public class JwtAdminToken {
    private String grantType; // JWT에 대한 인증 타입 Bearer 인증 방식을 사용
    private String accessToken;
    private String refreshToken;
}
