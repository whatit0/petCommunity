package com.example.petcommunity.service.member;

import com.example.petcommunity.dto.member.MemberDTO;
import com.example.petcommunity.security.jwt.JwtToken;
import org.springframework.stereotype.Service;

@Service
public interface MemberService {
    void memberSingUp(MemberDTO memberDTO);

    JwtToken memberLogin(MemberDTO memberDTO);
}

