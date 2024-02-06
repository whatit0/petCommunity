package com.example.petcommunity.controller.member;

import com.example.petcommunity.service.member.MemberIdCheckService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class MemberIdCheckController {

    private final MemberIdCheckService memberIdCheckService;

    @GetMapping("/api/check-userId")
    public ResponseEntity<Boolean> checkUserId(@RequestParam String userId) {
        boolean userIdAvailable = memberIdCheckService.userIdCheck(userId);
        return ResponseEntity.ok(userIdAvailable);
    }
}
