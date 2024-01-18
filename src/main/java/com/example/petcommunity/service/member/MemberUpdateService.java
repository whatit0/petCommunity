package com.example.petcommunity.service.member;

import com.example.petcommunity.dto.member.MemberDTO;
import com.example.petcommunity.entity.member.MemberEntity;
import com.example.petcommunity.repository.member.MemberRepository;
import com.example.petcommunity.security.jwt.JwtProvider;
import com.example.petcommunity.security.jwt.JwtToken;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Builder
public class MemberUpdateService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public MemberDTO getUserInfo(String userId) {
        MemberEntity memberEntity = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

        return MemberDTO.toMemberDTO(memberEntity);
    }

    public JwtToken updateUser(MemberDTO memberDTO) {
        MemberEntity memberEntity = memberRepository.findByUserId(memberDTO.getUserId())
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

        // 비밀번호가 제공된 경우 업데이트
        if (memberDTO.getUserPwd() != null && !memberDTO.getUserPwd().isEmpty()) {
            memberEntity.setUserPwd(passwordEncoder.encode(memberDTO.getUserPwd()));
        }

        // 나머지 정보를 업데이트
        memberEntity.setUserId(memberDTO.getUserId());
        memberEntity.setUserName(memberDTO.getUserName());
        memberEntity.setUserNickname(memberDTO.getUserNickname());
        memberEntity.setUserAge(memberDTO.getUserAge());
        memberEntity.setUserTel(memberDTO.getUserTel());
        memberEntity.setUserAddress(memberDTO.getUserAddress());

        memberRepository.save(memberEntity); // 변경된 정보를 저장

        // 새로운 JWT 토큰 생성
        String newAccessToken = jwtProvider.createJwt(memberDTO.getUserId());
        String newRefreshToken = jwtProvider.createRefreshToken(memberDTO.getUserId());

        // 새로운 토큰을 반환
        return JwtToken.builder()
                .grantType("Bearer")
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
    }



    public JwtToken refreshAccessToken(String refreshToken) {
        String userId = jwtProvider.validateToken(refreshToken); // Refresh Token 유효성 검사
        String newAccessToken = jwtProvider.createJwt(userId); // 새로운 Access Token 생성
        String newRefreshToken = jwtProvider.createRefreshToken(userId); // 새로운 Refresh Token 생성

        return JwtToken.builder()
                .grantType("Bearer")
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
    }
}
