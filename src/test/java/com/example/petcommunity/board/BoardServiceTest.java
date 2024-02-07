package com.example.petcommunity.board;

import com.example.petcommunity.dto.board.DailyBoardDTO;
import com.example.petcommunity.entity.board.DailyBoardEntity;
import com.example.petcommunity.entity.member.MemberEntity;
import com.example.petcommunity.repository.board.DailyBoardRepository;
import com.example.petcommunity.repository.member.MemberRepository;
import com.example.petcommunity.service.board.impl.BoardServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
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

@ExtendWith(MockitoExtension.class)
public class BoardServiceTest {

    @Mock
    private DailyBoardRepository dailyBoardRepository;

    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private BoardServiceImpl boardService;

    @Test
    public void saveBoardTest() {
        // 가짜 Authentication 객체 설정
        Authentication authentication = new UsernamePasswordAuthenticationToken("user", null);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        // MemberEntity 가짜 객체 반환 설정
        MemberEntity fakeMemberEntity = new MemberEntity();
        when(memberRepository.findByUserId(anyString())).thenReturn(Optional.of(fakeMemberEntity));

        // DailyBoardDTO 객체 생성
        DailyBoardDTO dailyBoardDTO = new DailyBoardDTO();
        dailyBoardDTO.setDailyTitle("제목");
        dailyBoardDTO.setDailyContent("내용");
        dailyBoardDTO.setDailyCategory("카테고리");
        dailyBoardDTO.setDailyDogBreed("견종");

        boardService.saveBoard(dailyBoardDTO);

        verify(dailyBoardRepository).save(any(DailyBoardEntity.class));
    }
}
