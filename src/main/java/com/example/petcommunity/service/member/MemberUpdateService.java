package com.example.petcommunity.service.member;

import com.example.petcommunity.dto.member.MemberDTO;
import com.example.petcommunity.security.jwt.user.JwtUserToken;
import org.springframework.stereotype.Service;
@Service
public interface MemberUpdateService {
    MemberDTO getUserInfo(String userId);
    JwtUserToken updateUser(MemberDTO memberDTO);
    JwtUserToken refreshAccessToken(String refreshToken);
}

