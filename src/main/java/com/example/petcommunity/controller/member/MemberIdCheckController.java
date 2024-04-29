package com.example.petcommunity.controller.member;

import com.example.petcommunity.service.member.MemberIdCheckService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://13.211.140.253:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class MemberIdCheckController {

    private final MemberIdCheckService memberIdCheckService;

    @GetMapping("/api/check-userId")
    @Operation(summary = "사용자 ID 중복 확인", description = "입력된 사용자 ID의 중복 여부를 확인합니다.")
    @ApiResponse(responseCode = "200", description = "ID 중복 여부 (false: 중복, true: 사용 가능)", content = @Content(schema = @Schema(implementation = Boolean.class)))
    public ResponseEntity<Boolean> checkUserId(@Parameter(description = "확인하고자 하는 사용자 ID") @RequestParam String userId) {
        boolean userIdAvailable = memberIdCheckService.userIdCheck(userId);
        return ResponseEntity.ok(userIdAvailable);
    }
}
