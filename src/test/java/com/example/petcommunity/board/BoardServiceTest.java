package com.example.petcommunity.board;

import com.example.petcommunity.dto.board.BoardDTO;
import com.example.petcommunity.entity.board.BoardEntity;
import com.example.petcommunity.entity.member.MemberEntity;
import com.example.petcommunity.repository.board.BoardRepository;
import com.example.petcommunity.repository.member.MemberRepository;
import com.example.petcommunity.service.board.impl.BoardServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class BoardServiceTest {

    @Mock
    private BoardRepository BoardRepository;

    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private BoardServiceImpl boardService;

    @Captor
    private ArgumentCaptor<BoardEntity> boardEntityCaptor;

    @BeforeEach
    public void setUp() {
        // 가짜 Authentication 객체 설정
        Authentication authentication = new UsernamePasswordAuthenticationToken("user", null);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    public void saveBoardTest() {


        // MemberEntity 가짜 객체 반환 설정
        MemberEntity fakeMemberEntity = new MemberEntity();
        when(memberRepository.findByUserId(anyString())).thenReturn(Optional.of(fakeMemberEntity));

        // DailyBoardDTO 객체 생성
        BoardDTO boardDTO = new BoardDTO();
        boardDTO.setBoardTitle("제목");
        boardDTO.setBoardContent("내용");
        boardDTO.setBoardCategory("카테고리");
        //boardDTO.setBoardDogBreed("견종");

        boardService.saveBoard(boardDTO);

        verify(BoardRepository).save(boardEntityCaptor.capture());
        BoardEntity capturedBoardEntity = boardEntityCaptor.getValue();

        assertEquals(boardDTO.getBoardTitle(), capturedBoardEntity.getBoardTitle());
        assertEquals(boardDTO.getBoardContent(), capturedBoardEntity.getBoardContent());
        assertEquals(boardDTO.getBoardCategory(), capturedBoardEntity.getBoardCategory());
        //assertEquals(boardDTO.getBoardDogBreed(), capturedBoardEntity.getBoardDogBreed());
    }
}
