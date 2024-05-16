package com.example.petcommunity.controller.member;


import com.example.petcommunity.dto.member.MemberDTO;
import com.example.petcommunity.security.exception.CustomException;
import com.example.petcommunity.security.jwt.JwtToken;
import com.example.petcommunity.service.member.MemberService;
import com.example.petcommunity.service.member.MemberUpdateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${cross.origin.url}", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class MemberController {

    private final MemberService memberService;
    private final MemberUpdateService memberUpdateService;

    @PostMapping("/api/register")
    @Operation(summary = "회원 가입", description = "새로운 회원을 등록합니다.")
    @ApiResponse(responseCode = "200", description = "회원 가입 성공!", content = @Content(schema = @Schema(implementation = String.class)))
    public ResponseEntity<?> memberSingUp(@RequestBody MemberDTO memberDTO) {
        memberService.memberSingUp(memberDTO);
        return ResponseEntity.ok("회원 가입 성공!");
    }

    @PostMapping("/api/login")
    @Operation(summary = "로그인", description = "회원 로그인을 수행하고 JWT 토큰을 반환합니다.")
    @ApiResponse(responseCode = "200", description = "JWT 토큰 반환", content = @Content(schema = @Schema(implementation = JwtToken.class)))
    public ResponseEntity<?> memberLogin(@RequestBody MemberDTO memberDTO) {
        try {
            JwtToken jwtToken = memberService.memberLogin(memberDTO);
            return ResponseEntity.ok(jwtToken);
        } catch (UsernameNotFoundException | CustomException e) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(Collections.singletonMap("message", e.getMessage()));
        }
    }

    @PostMapping("/api/token/refresh")
    @Operation(summary = "토큰 갱신", description = "리프레시 토큰을 이용해 액세스 토큰을 갱신합니다.")
    @ApiResponse(responseCode = "200", description = "새 JWT 토큰 반환", content = @Content(schema = @Schema(implementation = JwtToken.class)))
    public ResponseEntity<?> refreshAccessToken(@RequestBody String refreshToken) {
        JwtToken jwtToken = memberUpdateService.refreshAccessToken(refreshToken);
        return ResponseEntity.ok(jwtToken);
    }
}
