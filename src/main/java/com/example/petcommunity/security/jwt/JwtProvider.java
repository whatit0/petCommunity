package com.example.petcommunity.security.jwt;

import com.example.petcommunity.security.exception.CustomException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
public class JwtProvider {
    private final Key key;

    public JwtProvider() { // secretKey 생성
        key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    public String createJwt(String userId) {
        // 주어진 사용자 ID를 사용하여 Access Token 생성 => 1시간 유효
        return createToken(userId, 1, ChronoUnit.HOURS);
    }

    public String createRefreshToken(String userId) {
        //  액세스 토큰이 만료된 후 새로운 액세스 토큰 생성
        return createToken(userId, 7, ChronoUnit.DAYS);
    }

    private String createToken(String userId, int amountToAdd, ChronoUnit chronoUnit) {
        Date expiredDate = Date.from(Instant.now().plus(amountToAdd, chronoUnit)); // 토큰의 만료 시간을 설정

        return Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS256)
                .setSubject(userId)
                .setIssuedAt(new Date())
                .setExpiration(expiredDate)
                .compact();
    }

    public String validateToken(String jwt) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();

            return claims.getSubject(); // // 토큰이 유효하면 사용자 ID(subject) 반환
        } catch (ExpiredJwtException e) {
            throw new CustomException("토큰이 만료되었습니다.", HttpStatus.UNAUTHORIZED);
        } catch (JwtException e) {
            throw new CustomException("유효하지 않은 토큰입니다.", HttpStatus.UNAUTHORIZED);
        }
    }
}