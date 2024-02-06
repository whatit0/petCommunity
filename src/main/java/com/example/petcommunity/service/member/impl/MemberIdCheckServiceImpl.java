package com.example.petcommunity.service.member.impl;

import com.example.petcommunity.repository.member.MemberRepository;
import com.example.petcommunity.service.member.MemberIdCheckService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberIdCheckServiceImpl implements MemberIdCheckService {

    private final MemberRepository memberRepository;
    @Override
    public boolean userIdCheck(String userId) {
        return memberRepository.findByUserId(userId).isEmpty();
    }
}
