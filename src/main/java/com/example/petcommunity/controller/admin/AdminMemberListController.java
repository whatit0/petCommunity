package com.example.petcommunity.controller.admin;

import com.example.petcommunity.dto.member.MemberDTO;
import com.example.petcommunity.service.admin.AdminMemberListService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class AdminMemberListController {

    private final AdminMemberListService adminMemberListService;

    /*
        1. 전체 회원 목록 조회하기 때문에 List 타입 사용!
     */
    @GetMapping("/api/user/list")
    @Operation(summary = "모든 사용자 정보 조회", description = "등록된 모든 사용자의 정보를 조회.")
    @ApiResponse(responseCode = "200", description = "사용자 정보를 성공적으로 조회했습니다.")
    @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다.")
    public ResponseEntity<List<MemberDTO>> getAllMembers() {
        List<MemberDTO> members = adminMemberListService.getAllMembers();
        return ResponseEntity.ok(members);
    }

}
