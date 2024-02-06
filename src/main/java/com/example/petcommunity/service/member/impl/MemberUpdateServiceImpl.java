package com.example.petcommunity.service.member.impl;

import com.example.petcommunity.dto.member.MemberDTO;
import com.example.petcommunity.entity.member.MemberEntity;
import com.example.petcommunity.repository.member.MemberRepository;
import com.example.petcommunity.security.exception.CustomException;
import com.example.petcommunity.security.jwt.JwtToken;
import com.example.petcommunity.security.jwt.JwtTokenProvider;
import com.example.petcommunity.service.member.MemberUpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class MemberUpdateServiceImpl implements MemberUpdateService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public MemberDTO getUserInfo(String userId) {
        MemberEntity memberEntity = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
        return MemberDTO.toMemberDTO(memberEntity);
    }

    @Override
    public JwtToken updateUser(MemberDTO memberDTO) {
        MemberEntity memberEntity = memberRepository.findByUserId(memberDTO.getUserId())
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

        // 비밀번호가 제공된 경우 업데이트
        if (memberDTO.getUserPwd() != null && !memberDTO.getUserPwd().isEmpty()) {
            memberEntity.setUserPwd(passwordEncoder.encode(memberDTO.getUserPwd()));
        }

        // 나머지 정보를 업데이트
        memberEntity.setUserName(memberDTO.getUserName());
        memberEntity.setUserNickname(memberDTO.getUserNickname());
        memberEntity.setUserAge(memberDTO.getUserAge());
        memberEntity.setUserTel(memberDTO.getUserTel());
        memberEntity.setUserAddress(memberDTO.getUserAddress());

        memberRepository.save(memberEntity);

        // 사용자 권한 설정 ("ROLE_USER")
        Collection<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));

        return jwtTokenProvider.createToken(memberEntity.getUserId(), authorities);
    }

    @Override
    public JwtToken refreshAccessToken(String refreshToken) {
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new CustomException("리프레시 토큰이 유효하지 않습니다.", HttpStatus.UNAUTHORIZED);
        }
        String userId = jwtTokenProvider.getUserIdFromToken(refreshToken);

        // 사용자 권한 설정 (기본값: "ROLE_USER")
        Collection<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));

        return jwtTokenProvider.createToken(userId, authorities);
    }
}