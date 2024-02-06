package com.example.petcommunity.service.member.impl;

import com.example.petcommunity.entity.member.MemberEntity;
import com.example.petcommunity.repository.member.MemberRepository;
import com.example.petcommunity.security.exception.CustomException;
import com.example.petcommunity.service.member.MemberDeleteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class MemberDeleteServiceImpl implements MemberDeleteService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void deleteUser(String userId, String userPwd) {
        // 데이터베이스에서 사용자 찾기
        MemberEntity member = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

        // 비밀번호 확인
        if (!passwordEncoder.matches(userPwd, member.getUserPwd())) {
            throw new CustomException("비밀번호가 일치하지 않습니다.", HttpStatus.UNAUTHORIZED);
        }
        // 사용자 삭제
        memberRepository.delete(member);
    }
}
