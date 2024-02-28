package com.example.petcommunity.service.board;

import com.example.petcommunity.dto.board.CommentDTO;

public interface CommentService {
    CommentDTO addCommentToBoard(CommentDTO commentDTO);
}
