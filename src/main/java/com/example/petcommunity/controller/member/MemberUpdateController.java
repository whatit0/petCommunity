package com.example.petcommunity.controller.member;


import com.example.petcommunity.dto.member.MemberDTO;
import com.example.petcommunity.security.exception.CustomException;
import com.example.petcommunity.security.jwt.JwtToken;
import com.example.petcommunity.service.member.MemberUpdateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${cross.origin.url}", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PATCH}, allowCredentials = "true")
public class MemberUpdateController {

    private final MemberUpdateService memberUpdateService;

    @GetMapping("/api/user/info/{userNo}")
    @Operation(summary = "사용자 정보 조회", description = "특정 사용자의 정보를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "사용자 정보 반환", content = @Content(schema = @Schema(implementation = MemberDTO.class)))
    public ResponseEntity<MemberDTO> getUserInfo(@Parameter(description = "사용자 번호") @PathVariable Long userNo) {
        MemberDTO memberDTO = memberUpdateService.getUserInfoByNo(userNo);
        return ResponseEntity.ok(memberDTO);
    }

    @PatchMapping("/api/user/update")
    @Operation(summary = "사용자 정보 업데이트", description = "사용자의 정보를 업데이트합니다.")
    @ApiResponse(responseCode = "200", description = "업데이트된 JWT 토큰 반환", content = @Content(schema = @Schema(implementation = JwtToken.class)))
    @ApiResponse(responseCode = "401", description = "인증 실패",content = @Content)
    public ResponseEntity<?> updateUser(@RequestBody MemberDTO memberDTO) {
        try {
            JwtToken newTokens = memberUpdateService.updateUser(memberDTO);
            return ResponseEntity.ok(newTokens);
        } catch (CustomException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}