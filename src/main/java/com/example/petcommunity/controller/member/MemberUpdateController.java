package com.example.petcommunity.controller.member;


import com.example.petcommunity.dto.member.MemberDTO;
import com.example.petcommunity.security.exception.CustomException;
import com.example.petcommunity.security.jwt.JwtToken;
import com.example.petcommunity.service.member.MemberUpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PATCH}, allowCredentials = "true")
public class MemberUpdateController {

    private final MemberUpdateService memberUpdateService;

    @GetMapping("/api/user/info/{userNo}")
    public ResponseEntity<MemberDTO> getUserInfo(@PathVariable Long userNo) {
        MemberDTO memberDTO = memberUpdateService.getUserInfoByNo(userNo);
        return ResponseEntity.ok(memberDTO);
    }

    @PatchMapping("/api/user/update")
    public ResponseEntity<?> updateUser(@RequestBody MemberDTO memberDTO) {
        try {
            JwtToken newTokens = memberUpdateService.updateUser(memberDTO);
            return ResponseEntity.ok(newTokens);
        } catch (CustomException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}