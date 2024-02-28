package com.example.petcommunity.service.board;

import com.example.petcommunity.dto.board.BoardDTO;

import java.util.List;

public interface BoardService {

    void saveBoard(BoardDTO dailyBoardDTO);

    List<BoardDTO> getAllBoards();
    BoardDTO getBoardDetail(int boardNo);
}
