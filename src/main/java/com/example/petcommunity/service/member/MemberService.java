package com.example.petcommunity.service.member;

import com.example.petcommunity.dto.member.MemberDTO;
import com.example.petcommunity.entity.member.MemberEntity;
import com.example.petcommunity.repository.member.MemberRepository;
import com.example.petcommunity.security.CustomException;
import com.example.petcommunity.security.JwtProvider;
import com.example.petcommunity.security.JwtToken;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;



    public void memberSingUp(MemberDTO memberDTO) {
        // 비밀번호 인코딩
        String encodedPassword = passwordEncoder.encode(memberDTO.getUserPwd());
        memberDTO.setUserPwd(encodedPassword);

        // DTO -> Entity 변환 및 저장
        MemberEntity memberEntity = MemberEntity.toMemberEntity(memberDTO);
        memberRepository.save(memberEntity);
    }

    public JwtToken memberLogin(MemberDTO memberDTO) {
        MemberEntity memberEntity = memberRepository.findByUserId(memberDTO.getUserId())
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

        if (!passwordEncoder.matches(memberDTO.getUserPwd(), memberEntity.getUserPwd())) {
            throw new CustomException("비밀번호가 일치하지 않습니다.", HttpStatus.UNAUTHORIZED);
        }

        String accessToken = jwtProvider.createJwt(memberEntity.getUserId());
        String refreshToken = jwtProvider.createRefreshToken(memberEntity.getUserId());

        return JwtToken.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public JwtToken refreshAccessToken(String refreshToken) {
        String userId = jwtProvider.validate(refreshToken); // Refresh Token 유효성 검사
        String newAccessToken = jwtProvider.createJwt(userId); // 새로운 Access Token 생성
        String newRefreshToken = jwtProvider.createRefreshToken(userId); // 새로운 Refresh Token 생성

        return JwtToken.builder()
                .grantType("Bearer")
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
    }
}

