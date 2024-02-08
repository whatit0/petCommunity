package com.example.petcommunity.service.board.impl;

import com.example.petcommunity.dto.board.BoardDTO;
import com.example.petcommunity.entity.board.BoardEntity;
import com.example.petcommunity.entity.member.MemberEntity;
import com.example.petcommunity.repository.board.BoardRepository;
import com.example.petcommunity.repository.member.MemberRepository;
import com.example.petcommunity.service.board.BoardService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository BoardRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public void saveBoard(BoardDTO dailyBoardDTO) throws IllegalArgumentException{
        if (!StringUtils.hasText(dailyBoardDTO.getBoardTitle())) {
            throw new IllegalArgumentException("게시글 제목은 필수입니다.");
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findByUserId(authentication.getName());

        if (optionalMemberEntity.isEmpty()) {
            throw new IllegalArgumentException("사용자를 찾을 수 없습니다.");
        }
        MemberEntity memberEntity = optionalMemberEntity.get();

        BoardEntity dailyBoardEntity = BoardEntity.builder()
                .boardTitle(dailyBoardDTO.getBoardTitle())
                .boardContent(dailyBoardDTO.getBoardContent())
                .boardCategory(dailyBoardDTO.getBoardCategory())
                .boardDogBreed(dailyBoardDTO.getBoardDogBreed())
                .userNo(memberEntity)
                .build();

        BoardRepository.save(dailyBoardEntity);
    }
}
