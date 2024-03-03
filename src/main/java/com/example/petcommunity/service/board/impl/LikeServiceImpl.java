package com.example.petcommunity.service.board.impl;

import com.example.petcommunity.dto.board.LikeDTO;
import com.example.petcommunity.entity.board.BoardEntity;
import com.example.petcommunity.entity.board.UserBoardLike;
import com.example.petcommunity.entity.member.MemberEntity;
import com.example.petcommunity.repository.board.BoardRepository;
import com.example.petcommunity.repository.board.UserBoardLikeRepository;
import com.example.petcommunity.repository.member.MemberRepository;
import com.example.petcommunity.service.board.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private UserBoardLikeRepository userBoardLikeRepository;
    @Override
    public LikeDTO toggleLike(LikeDTO likedto) {
        BoardEntity board = boardRepository.findById(likedto.getBoardNo())
                .orElseThrow(() -> new IllegalArgumentException("게시물을 찾을 수 없습니다."));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findByUserId(authentication.getName());
        if (optionalMemberEntity.isEmpty()) throw new IllegalArgumentException("사용자를 찾을 수 없습니다.");
        MemberEntity user = optionalMemberEntity.get();

        Optional<UserBoardLike> userBoardLikeOpt = userBoardLikeRepository.findByUserAndBoard(user, board);

        if (userBoardLikeOpt.isPresent()) { // 데이터가 있다면
            UserBoardLike userBoardLike = userBoardLikeOpt.get(); // userBoardLike에 get

            if (userBoardLike.getIsLiked() != null) {
                if (userBoardLike.getIsLiked() == likedto.isLikeAction()) { // dto랑 db랑 같다면
                    // 같은 액션을 다시 수행하면 상태를 취소
                    userBoardLike.setIsLiked(null);
                    if (likedto.isLikeAction()) {
                        board.setBoardLike(board.getBoardLike() - 1);
                    } else {
                        board.setBoardunLike(board.getBoardunLike() - 1);
                    }
                } else { // 액션이 서로 다르다면
                    // 좋아요와 싫어요를 전환
                    userBoardLike.setIsLiked(likedto.isLikeAction());
                    if (likedto.isLikeAction()) {
                        board.setBoardLike(board.getBoardLike() + 1);
                        board.setBoardunLike(board.getBoardunLike() - 1);
                    } else {
                        board.setBoardLike(board.getBoardLike() - 1);
                        board.setBoardunLike(board.getBoardunLike() + 1);
                    }
                }
            } else {
                // 처음 상태 설정
                userBoardLike.setIsLiked(likedto.isLikeAction());
                if (likedto.isLikeAction()) {
                    board.setBoardLike(board.getBoardLike() + 1);
                } else {
                    board.setBoardunLike(board.getBoardunLike() + 1);
                }
            }
            userBoardLikeRepository.save(userBoardLike);
        } else {
            // 새 좋아요/싫어요 기록 생성
            UserBoardLike newUserBoardLike = new UserBoardLike();
            newUserBoardLike.setBoard(board);
            newUserBoardLike.setUser(user);
            newUserBoardLike.setIsLiked(likedto.isLikeAction());
            userBoardLikeRepository.save(newUserBoardLike);

            if (likedto.isLikeAction()) {
                board.setBoardLike(board.getBoardLike() + 1);
            } else {
                board.setBoardunLike(board.getBoardunLike() + 1);
            }
        }

        boardRepository.save(board);

        return LikeDTO.builder()
                .boardNo(board.getBoardNo())
                .boardLike(board.getBoardLike())
                .boardunLike(board.getBoardunLike())
                .isLikeAction(likedto.isLikeAction())
                .build();
    }
}
