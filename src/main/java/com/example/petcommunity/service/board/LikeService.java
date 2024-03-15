package com.example.petcommunity.service.board;

import com.example.petcommunity.dto.board.LikeDTO;
import org.springframework.stereotype.Service;

@Service
public interface LikeService {
    LikeDTO toggleLike(LikeDTO likeDTO);
}
