package com.example.petcommunity.service.board;

import com.example.petcommunity.dto.board.CommentDTO;
import org.springframework.stereotype.Service;

@Service
public interface CommentService {
    CommentDTO addCommentToBoard(CommentDTO commentDTO);
}
