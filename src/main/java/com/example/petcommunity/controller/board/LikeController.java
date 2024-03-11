package com.example.petcommunity.controller.board;

import com.example.petcommunity.dto.board.LikeDTO;
import com.example.petcommunity.service.board.impl.LikeServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class LikeController {

    private final LikeServiceImpl likeService;
    private static final Logger logger = LoggerFactory.getLogger(LikeController.class);
    @PostMapping("/toggle")
    public ResponseEntity<?> toggleLike(@RequestBody LikeDTO likeDTO) {
        logger.info("Received toggleLike Request : {} ", likeDTO);
        LikeDTO like = likeService.toggleLike(likeDTO);
        return ResponseEntity.ok(like);
    }
}
