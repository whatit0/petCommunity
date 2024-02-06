package com.example.petcommunity.service.member;

import com.example.petcommunity.dto.member.MemberDTO;
import com.example.petcommunity.security.jwt.JwtToken;
import org.springframework.stereotype.Service;
@Service
public interface MemberUpdateService {
    MemberDTO getUserInfo(String userId);
    JwtToken updateUser(MemberDTO memberDTO);
    JwtToken refreshAccessToken(String refreshToken);
}

