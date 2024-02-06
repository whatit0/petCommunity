package com.example.petcommunity.security.jwt.user;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUserAuthenticationFilter extends OncePerRequestFilter {
    private final JwtUserTokenProvider jwtUserTokenProvider;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        try {
            String token = parseBearerToken(request);
            log.debug("Token: {}", token);

            if (token != null && jwtUserTokenProvider.validateToken(token)) {
                // 토큰에서 userId 추출(아니면 userId가 null 값으로 발생한다!)
                String userId = jwtUserTokenProvider.getUserIdFromToken(token);
                log.debug("Authenticated userId: {}", userId);

                Authentication authentication = jwtUserTokenProvider.getAuthentication(token);
                log.debug("Authentication: {}", authentication);

                // Authentication 객체에 UserDetails 대신 userId를 직접 principal 로 설정
                Authentication customAuthentication =
                        new UsernamePasswordAuthenticationToken(userId, null, authentication.getAuthorities());

                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                securityContext.setAuthentication(customAuthentication);
                SecurityContextHolder.setContext(securityContext);
            }
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token", e);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰이 만료되었습니다.");
            return;
        } catch (JwtException e) {
            log.info("Invalid JWT Token", e);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "유효하지 않은 토큰입니다.");
            return;
        } catch (Exception e) {
            log.error("Authentication error", e);
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "인증 처리 중 오류가 발생했습니다.");
            return;
        }
        filterChain.doFilter(request, response);
    }

    // Request Header 에서 토큰 정보 추출
    private String parseBearerToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        log.debug("Authorization Header: {}", authorization);
        if (authorization != null && authorization.startsWith("Bearer ")) {
            return authorization.substring(7);
        }
        return null;
    }
}