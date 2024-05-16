package com.example.petcommunity.controller.member;

import com.example.petcommunity.dto.member.MemberDTO;
import com.example.petcommunity.service.member.MemberDeleteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${cross.origin.url}", methods = {RequestMethod.GET, RequestMethod.POST }, allowCredentials = "true")
public class MemberDeleteController {

    private final MemberDeleteService memberDeleteService;

    @PostMapping("/api/user/delete")
    @Operation(summary = "회원 탈퇴 처리", description = "회원 탈퇴를 요청합니다. 관리자 또는 해당 사용자 본인만이 탈퇴를 요청할 수 있습니다.")
    @ApiResponse(responseCode = "200", description = "회원 탈퇴가 성공적으로 처리되었습니다.", content = @Content(schema = @Schema(implementation = String.class)))
    @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content)
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
