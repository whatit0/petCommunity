package com.example.petcommunity.repository.board;

import com.example.petcommunity.entity.board.BoardEntity;
import com.example.petcommunity.entity.board.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {
    List<CommentEntity> findByBoard(BoardEntity board);

    int countByBoard(BoardEntity board);
}
