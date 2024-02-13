package com.example.petcommunity.service.admin.impl;

import com.example.petcommunity.dto.member.MemberDTO;
import com.example.petcommunity.entity.member.MemberEntity;
import com.example.petcommunity.repository.member.MemberRepository;
import com.example.petcommunity.service.admin.AdminMemberListService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminMemberListServiceImpl implements AdminMemberListService {

    private final MemberRepository memberRepository;
    @Override
    public List<MemberDTO> getAllMembers() {
        /*
            1. 데이터베이스에서 모든 회원 정보를 조회
            2. DTO 객체를 저장할 리스트를 생성
            3. 조회된 회원 정보(memberEntities)를 반복하면서, 각 회원 정보를 DTO 변환
            4. 모든 회원 정보가 담긴 DTO 리스트를 반환
         */
        List<MemberEntity> memberEntityList = memberRepository.findAll();
        List<MemberDTO> memberDTOList = new ArrayList<>();
        for (MemberEntity memberEntity : memberEntityList) {
            // toMemberDTO 정적 메서드를 사용하여 MemberEntity -> MemberDTO 변환
            MemberDTO memberDTO = MemberDTO.toMemberDTO(memberEntity);
            memberDTOList.add(memberDTO);
        }
        // 모든 회원 정보가 담긴 DTO 리스트를 반환합니다.
        return memberDTOList;
    }
}
