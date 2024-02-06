package com.example.petcommunity.repository.board;

import com.example.petcommunity.entity.board.DailyBoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DailyBoardRepository extends JpaRepository<DailyBoardEntity, Integer> {
}
