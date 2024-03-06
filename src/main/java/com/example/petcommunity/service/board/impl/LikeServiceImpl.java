package com.example.petcommunity.service.board.impl;

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
    public void toggleLike(int boardId, boolean isLikeAction) {


        BoardEntity board = boardRepository.findById(boardId)
                .orElseThrow(() -> new IllegalArgumentException("게시물을 찾을 수 없습니다."));


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findByUserId(authentication.getName());
        if (optionalMemberEntity.isEmpty()) throw new IllegalArgumentException("사용자를 찾을 수 없습니다.");
        MemberEntity user = optionalMemberEntity.get();

        Optional<UserBoardLike> userBoardLikeOpt = userBoardLikeRepository.findByUserAndBoard(user, board);

        if (userBoardLikeOpt.isPresent()) {
            UserBoardLike userBoardLike = userBoardLikeOpt.get();
            // 현재 상태와 반대로 설정
            if (isLikeAction) {
                boolean currentLikeStatus = userBoardLike.getIsLiked() != null && userBoardLike.getIsLiked();
                userBoardLike.setIsLiked(!currentLikeStatus);
                if (currentLikeStatus) {
                    board.setBoardLike(board.getBoardLike() - 1); // 좋아요 취소
                } else {
                    board.setBoardLike(board.getBoardLike() + 1); // 좋아요
                }
            } else {
                // 싫어요 로직 처리
                boolean currentDislikeStatus = userBoardLike.getIsLiked() != null && !userBoardLike.getIsLiked();
                userBoardLike.setIsLiked(currentDislikeStatus ? null : false);
                if (currentDislikeStatus) {
                    board.setBoardunLike(board.getBoardunLike() - 1); // 싫어요 취소
                } else {
                    board.setBoardunLike(board.getBoardunLike() + 1); // 싫어요
                }
            }
        } else {

            UserBoardLike newUserBoardLike = new UserBoardLike();
            newUserBoardLike.setBoard(board);
            newUserBoardLike.setUser(user);
            newUserBoardLike.setIsLiked(isLikeAction ? true : false);
            userBoardLikeRepository.save(newUserBoardLike);

            if (isLikeAction) {
                board.setBoardLike(board.getBoardLike() + 1);
            } else {
                board.setBoardunLike(board.getBoardunLike() + 1);
            }
        }

        boardRepository.save(board);
    }
}
