package com.example.petcommunity.service.board.impl;

import com.example.petcommunity.dto.board.DailyBoardDTO;
import com.example.petcommunity.entity.board.DailyBoardEntity;
import com.example.petcommunity.entity.member.MemberEntity;
import com.example.petcommunity.repository.board.DailyBoardRepository;
import com.example.petcommunity.repository.member.MemberRepository;
import com.example.petcommunity.service.board.BoardService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final DailyBoardRepository dailyBoardRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public void saveBoard(DailyBoardDTO dailyBoardDTO) throws IllegalArgumentException{
        if (StringUtils.isEmpty(dailyBoardDTO.getDailyTitle())) {
            throw new IllegalArgumentException("게시글 제목은 필수입니다.");
        }

        // MemberEntity memberEntity = memberRepository.findByUserId(dai)

        DailyBoardEntity dailyBoardEntity = DailyBoardEntity.builder()
                .dailyTitle(dailyBoardDTO.getDailyTitle())
                .dailyContent(dailyBoardDTO.getDailyContent())
                .dailyCategory(dailyBoardDTO.getDailyCategory())
                .dailyDogBreed(dailyBoardDTO.getDailyDogBreed())
                //.userNo(memberEntity)
                .build();

        dailyBoardRepository.save(dailyBoardEntity);
    }
}
