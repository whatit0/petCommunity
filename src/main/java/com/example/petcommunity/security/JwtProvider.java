package com.example.petcommunity.security;

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

    public JwtProvider() {
        key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    public String createJwt(String userId) {
        return createToken(userId, 1, ChronoUnit.HOURS); // Access Token, 1시간 유효
    }

    public String createRefreshToken(String userId) {
        return createToken(userId, 7, ChronoUnit.DAYS); // Refresh Token, 7일 유효
    }

    private String createToken(String userId, int amountToAdd, ChronoUnit chronoUnit) {
        Date expiredDate = Date.from(Instant.now().plus(amountToAdd, chronoUnit));

        return Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS256)
                .setSubject(userId)
                .setIssuedAt(new Date())
                .setExpiration(expiredDate)
                .compact();
    }

    public String validate(String jwt) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();

            return claims.getSubject();
        } catch (ExpiredJwtException e) {
            throw new CustomException("토큰이 만료되었습니다.", HttpStatus.UNAUTHORIZED);
        } catch (JwtException e) {
            throw new CustomException("유효하지 않은 토큰입니다.", HttpStatus.UNAUTHORIZED);
        }
    }
}
