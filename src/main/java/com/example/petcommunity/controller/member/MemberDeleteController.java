package com.example.petcommunity.controller.member;

import com.example.petcommunity.dto.member.MemberDTO;
import com.example.petcommunity.service.member.MemberDeleteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST }, allowCredentials = "true")
public class MemberDeleteController {

    private final MemberDeleteService memberDeleteService;

    @PostMapping("/api/user/delete")
    public ResponseEntity<?> deleteUser(@RequestBody MemberDTO memberDTO) {
        // 현재 인증된 사용자의 권한 확인
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));

        try {
            // 관리자 또는 해당 사용자 본인이면 삭제 처리
            memberDeleteService.deleteUser(memberDTO.getUserId(), memberDTO.getUserPwd(), isAdmin);
            return ResponseEntity.ok("회원 탈퇴가 성공적으로 처리되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
