package com.example.petcommunity.service.member;

import com.example.petcommunity.dto.member.MemberDTO;
import com.example.petcommunity.security.jwt.user.JwtUserToken;
import org.springframework.stereotype.Service;

@Service
public interface MemberService {
    void memberSingUp(MemberDTO memberDTO);

    JwtUserToken memberLogin(MemberDTO memberDTO);
}

