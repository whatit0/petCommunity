package com.example.petcommunity.controller.member;


import com.example.petcommunity.dto.member.MemberDTO;
import com.example.petcommunity.security.jwt.JwtToken;
import com.example.petcommunity.service.member.MemberUpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class MemberUpdateController {

    private final MemberUpdateService memberUpdateService;

    @GetMapping("/api/userInfo")
    public ResponseEntity<MemberDTO> getUserInfo(Principal principal) {
        String userId = principal.getName();
        MemberDTO memberDTO = memberUpdateService.getUserInfo(userId);
        return ResponseEntity.ok(memberDTO);
    }

    @PostMapping("/api/userUpdate")
    public ResponseEntity<?> updateUser(@RequestBody MemberDTO memberDTO, @AuthenticationPrincipal String userId) {
        // 로그인 상태인 사용자만 회원 수정
        if (!userId.equals(memberDTO.getUserId())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("자신의 정보만 수정 가능");
        }
        JwtToken newTokens = memberUpdateService.updateUser(memberDTO);
        return ResponseEntity.ok(newTokens); // 클라이언트에게 새로운 토큰 전달
    }
}