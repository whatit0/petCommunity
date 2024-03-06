package com.example.petcommunity.service.board;

import com.example.petcommunity.dto.board.LikeDTO;

public interface LikeService {
    LikeDTO toggleLike(LikeDTO likeDTO);
}
