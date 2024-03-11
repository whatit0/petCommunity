package com.example.petcommunity.service.board.impl;

import com.example.petcommunity.dto.board.CommentDTO;
import com.example.petcommunity.entity.board.BoardEntity;
import com.example.petcommunity.entity.board.CommentEntity;
import com.example.petcommunity.entity.member.MemberEntity;
import com.example.petcommunity.repository.board.BoardRepository;
import com.example.petcommunity.repository.board.CommentRepository;
import com.example.petcommunity.repository.member.MemberRepository;
import com.example.petcommunity.service.board.CommentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final ModelMapper modelMapper;
    private final MemberRepository memberRepository;
    @Override
    public CommentDTO addCommentToBoard(CommentDTO commentDTO) {
        CommentEntity commentEntity = modelMapper.map(commentDTO, CommentEntity.class);

        BoardEntity board = boardRepository.findById(commentDTO.getBoardNo())
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        commentEntity.setBoard(board);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findByUserId(authentication.getName());
        if (optionalMemberEntity.isEmpty()) {
            throw new IllegalArgumentException("사용자를 찾을 수 없습니다.");
        }
        MemberEntity memberEntity = optionalMemberEntity.get();


        commentEntity.setUser(memberEntity);
        CommentEntity savedComment = commentRepository.save(commentEntity);
        return modelMapper.map(savedComment, CommentDTO.class);
    }
}
