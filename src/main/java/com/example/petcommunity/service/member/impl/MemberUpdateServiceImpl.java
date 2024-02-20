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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberUpdateServiceImpl implements MemberUpdateService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public MemberDTO getUserInfoByNo(Long userNo) {
        /*
            1. 데이터베이스에서 userId에 해당하는 사용자 정보를 조회한다.
            2. 조회된 사용자 정보가 있는지 확인한다.
            3. MemberEntity -> MemberDTO 변환한다.
         */
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findByUserNo(userNo);
        if (optionalMemberEntity.isPresent()) {
            // 사용자 정보가 있다면, MemberEntity 객체를 get() 통해 optional 를 제거하고 확인한다
            MemberEntity memberEntity = optionalMemberEntity.get();
            return MemberDTO.toMemberDTO(memberEntity);
        } else {
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
        }
    }

    @Override
    public JwtToken updateUser(MemberDTO memberDTO) {
        // 현재 인증된 사용자의 권한을 확인
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin) {
            // 관리자가 아니면 현재 로그인한 사용자와 수정하려는 사용자 ID가 같은지 확인
            String currentUserId = authentication.getName();
            if (!memberDTO.getUserId().equals(currentUserId)) {
                throw new CustomException("자신의 정보만 수정 가능합니다.", HttpStatus.UNAUTHORIZED);
            }
        }

        // 사용자 정보를 조회하고 업데이트
        MemberEntity memberEntity = memberRepository.findByUserId(memberDTO.getUserId())
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

        if (memberDTO.getUserPwd() != null && !memberDTO.getUserPwd().isEmpty()) {
            memberEntity.setUserPwd(passwordEncoder.encode(memberDTO.getUserPwd()));
        }

        // 나머지 정보를 업데이트
        memberEntity.setUserNo(memberEntity.getUserNo());
        memberEntity.setUserName(memberDTO.getUserName());
        memberEntity.setUserNickname(memberDTO.getUserNickname());
        memberEntity.setUserAge(memberDTO.getUserAge());
        memberEntity.setUserTel(memberDTO.getUserTel());
        memberEntity.setUserAddress(memberDTO.getUserAddress());

        memberRepository.save(memberEntity);

        // 권한 설정
        return jwtTokenProvider.createToken(memberEntity.getUserId(), memberEntity.getUserNo(), Collections.singletonList(new SimpleGrantedAuthority(isAdmin ? "ROLE_ADMIN" : "ROLE_USER")));
    }

    @Override
    public JwtToken refreshAccessToken(String refreshToken) {
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new CustomException("리프레시 토큰이 유효하지 않습니다.", HttpStatus.UNAUTHORIZED);
        }
        String userId = jwtTokenProvider.getUserIdFromToken(refreshToken);

        // 사용자 정보 조회하여 userNo 얻기
        MemberEntity memberEntity = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new UsernameNotFoundException("사용자 정보를 찾을 수 없습니다."));
        Long userNo = memberEntity.getUserNo();

        // 사용자 권한 설정 (기본값: "ROLE_USER")
        Collection<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));

        // userNo를 포함하여 토큰 생성
        return jwtTokenProvider.createToken(userId, userNo, authorities);
    }
}