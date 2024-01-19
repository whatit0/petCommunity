package com.example.petcommunity.controller.member;

import com.example.petcommunity.dto.member.MemberDTO;
import com.example.petcommunity.service.member.MemberDeleteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class MemberDeleteController {

    private final MemberDeleteService memberDeleteService;

    @PostMapping("/api/userDelete")
    public ResponseEntity<?> deleteUser(@RequestBody MemberDTO memberDTO, @AuthenticationPrincipal String userId) {
        if (!userId.equals(memberDTO.getUserId())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("자신의 정보만 삭제 가능합니다.");
        }

        memberDeleteService.deleteUser(memberDTO.getUserId(), memberDTO.getUserPwd());
        return ResponseEntity.ok("회원 탈퇴가 성공적으로 처리되었습니다.");
    }
}
