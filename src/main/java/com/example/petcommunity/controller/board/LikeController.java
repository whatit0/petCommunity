package com.example.petcommunity.controller.board;

import com.example.petcommunity.service.board.impl.LikeServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class LikeController {

    private final LikeServiceImpl likeService;

    @PostMapping("/toggle")
    public ResponseEntity<?> toggleLike(@RequestParam int boardId, @RequestParam boolean isLikeAction) {
        likeService.toggleLike(boardId, isLikeAction);
        return ResponseEntity.ok().build();
    }
}
