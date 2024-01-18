package com.example.petcommunity.controller.member;


import com.example.petcommunity.dto.member.MemberDTO;
import com.example.petcommunity.security.jwt.JwtToken;
import com.example.petcommunity.service.member.MemberService;
import com.example.petcommunity.service.member.MemberUpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        JwtToken jwtToken = memberService.memberLogin(memberDTO);
        return ResponseEntity.ok(jwtToken);
    }

    @PostMapping("/api/token/refresh")
    public ResponseEntity<?> refreshAccessToken(@RequestBody String refreshToken) {
        JwtToken jwtToken = memberUpdateService.refreshAccessToken(refreshToken);
        return ResponseEntity.ok(jwtToken);
    }
}
