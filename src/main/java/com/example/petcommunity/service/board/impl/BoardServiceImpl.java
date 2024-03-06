package com.example.petcommunity.service.board.impl;

import com.example.petcommunity.dto.board.BoardDTO;
import com.example.petcommunity.dto.board.CommentDTO;
import com.example.petcommunity.entity.board.BoardEntity;
import com.example.petcommunity.entity.board.CommentEntity;
import com.example.petcommunity.entity.member.MemberEntity;
import com.example.petcommunity.repository.board.BoardRepository;
import com.example.petcommunity.repository.board.CommentRepository;
import com.example.petcommunity.repository.member.MemberRepository;
import com.example.petcommunity.service.board.BoardService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;

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
                .boardDogBreeds(dailyBoardDTO.getBoardDogBreeds())
                .boardType(dailyBoardDTO.getBoardType())
                .user(memberEntity)
                .build();

        boardRepository.save(dailyBoardEntity);
    }

    @Override
    public List<BoardDTO> getAllBoards() {
        List<BoardEntity> boardEntities = boardRepository.findAll();

        List<BoardDTO> boardDTOs = boardEntities.stream()
                .map(board -> {
                    BoardDTO dto = convertToBoardDTO(board);
                    int commentCount = commentRepository.countByBoard(board);
                    dto.setCommentCount(commentCount);
                    dto.setUserName(board.getUser().getUserName());
                    return dto;
                })
                .collect(Collectors.toList());

        return boardDTOs;
    }

    @Override
    public BoardDTO getBoardDetail(int boardNo) {
        BoardEntity board = boardRepository.findById(boardNo)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        List<CommentEntity> comments = commentRepository.findByBoard(board);

        BoardDTO boardDTO = new BoardDTO();
        BeanUtils.copyProperties(board, boardDTO);

        List<CommentDTO> commentDTOs = comments.stream()
                .map(this::convertToCommentDTO)
                .collect(Collectors.toList());
        boardDTO.setComments(commentDTOs);
        boardDTO.setUserName(board.getUser().getUserName());
        return boardDTO;
    }

    private BoardDTO convertToBoardDTO(BoardEntity boardEntity) {
        BoardDTO dto = new BoardDTO();
        BeanUtils.copyProperties(boardEntity, dto);
        return dto;
    }

    private CommentDTO convertToCommentDTO(CommentEntity comment) {
        CommentDTO dto = new CommentDTO();
        BeanUtils.copyProperties(comment, dto);
        dto.setUserName(comment.getUser().getUserName());
        return dto;
    }
}
