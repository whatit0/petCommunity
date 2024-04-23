package com.example.petcommunity.board;

import com.example.petcommunity.dto.board.BoardDTO;
import com.example.petcommunity.entity.board.BoardEntity;
import com.example.petcommunity.entity.board.BoardType;
import com.example.petcommunity.entity.member.MemberEntity;
import com.example.petcommunity.repository.board.BoardRepository;
import com.example.petcommunity.repository.board.CommentRepository;
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

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class BoardServiceTest {

    @Mock
    private BoardRepository boardRepository;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private CommentRepository commentRepository;

    @InjectMocks
    private BoardServiceImpl boardService;

    @Captor
    private ArgumentCaptor<BoardEntity> boardEntityCaptor;

    private Authentication authentication;

    @BeforeEach
    public void setUp() {
        authentication = new UsernamePasswordAuthenticationToken("user", null);
        SecurityContext securityContext = mock(SecurityContext.class);
        lenient().when(securityContext.getAuthentication()).thenReturn(authentication); // lenient 설정 사용
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    public void saveBoardTest() {
        // MemberEntity 가짜 객체 반환 설정
        MemberEntity fakeMemberEntity = new MemberEntity();
        fakeMemberEntity.setUserId("user");
        fakeMemberEntity.setUserName("테스트 사용자");
        when(memberRepository.findByUserId(anyString())).thenReturn(Optional.of(fakeMemberEntity));

        // BoardDTO 객체 생성
        BoardDTO boardDTO = new BoardDTO();
        boardDTO.setBoardTitle("제목");
        boardDTO.setBoardContent("내용");
        boardDTO.setBoardCategory("카테고리");
        boardDTO.setBoardDogBreeds("견종");
        boardDTO.setBoardType(BoardType.DAILY);

        boardService.saveBoard(boardDTO);

        verify(boardRepository).save(boardEntityCaptor.capture());
        BoardEntity capturedBoardEntity = boardEntityCaptor.getValue();

        assertEquals(boardDTO.getBoardTitle(), capturedBoardEntity.getBoardTitle());
        assertEquals(boardDTO.getBoardContent(), capturedBoardEntity.getBoardContent());
        assertEquals(boardDTO.getBoardCategory(), capturedBoardEntity.getBoardCategory());
        assertEquals(boardDTO.getBoardDogBreeds(), capturedBoardEntity.getBoardDogBreeds());
        assertEquals(boardDTO.getBoardType(), capturedBoardEntity.getBoardType());
        assertEquals(fakeMemberEntity, capturedBoardEntity.getUser());
    }

    @Test
    public void saveBoardWithoutTitleThrowsException() {
        BoardDTO boardDTO = new BoardDTO(); // 제목 없음
        boardDTO.setBoardContent("내용");

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            boardService.saveBoard(boardDTO);
        });

        assertEquals("게시글 제목은 필수입니다.", exception.getMessage());
    }

    @Test
    public void saveBoardWithNonExistentUserThrowsException() {
        // 가짜 사용자 정보가 없음을 시뮬레이션
        when(memberRepository.findByUserId(anyString())).thenReturn(Optional.empty());

        // BoardDTO 객체 생성
        BoardDTO boardDTO = new BoardDTO();
        boardDTO.setBoardTitle("유저 없음 테스트 제목");
        boardDTO.setBoardContent("유저 없음 테스트 내용");

        // 예외가 발생하는지 테스트
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            boardService.saveBoard(boardDTO);
        });

        assertEquals("사용자를 찾을 수 없습니다.", exception.getMessage());
    }
}
