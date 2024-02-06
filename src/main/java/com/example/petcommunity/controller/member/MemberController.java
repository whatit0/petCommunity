package com.example.petcommunity.controller.member;


import com.example.petcommunity.dto.member.MemberDTO;
import com.example.petcommunity.security.exception.CustomException;
import com.example.petcommunity.security.jwt.user.JwtUserToken;
import com.example.petcommunity.service.member.MemberService;
import com.example.petcommunity.service.member.MemberUpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class MemberController {

    private final MemberService memberService;
    private final MemberUpdateService memberUpdateService;

    @PostMapping("/api/register")
    public ResponseEntity<?> memberSingUp(@RequestBody MemberDTO memberDTO) {
        memberService.memberSingUp(memberDTO);
        return ResponseEntity.ok("회원 가입 성공!");
    }

    @PostMapping("/api/login")
    public ResponseEntity<?> memberLogin(@RequestBody MemberDTO memberDTO) {
        try {
            JwtUserToken jwtUserToken = memberService.memberLogin(memberDTO);
            return ResponseEntity.ok(jwtUserToken);
        } catch (UsernameNotFoundException | CustomException e) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(Collections.singletonMap("message", e.getMessage()));
        }
    }

    @PostMapping("/api/token/refresh")
    public ResponseEntity<?> refreshAccessToken(@RequestBody String refreshToken) {
        JwtUserToken jwtUserToken = memberUpdateService.refreshAccessToken(refreshToken);
        return ResponseEntity.ok(jwtUserToken);
    }
}
