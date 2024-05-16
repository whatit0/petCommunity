package com.example.petcommunity.controller.board;

import com.example.petcommunity.dto.board.LikeDTO;
import com.example.petcommunity.service.board.impl.LikeServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cross.origin.url}", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class LikeController {

    private final LikeServiceImpl likeService;
    private static final Logger logger = LoggerFactory.getLogger(LikeController.class);
    @PostMapping("/toggle")
    @Operation(summary = "좋아요/싫어요 토글", description = "사용자가 선택한 게시물에 대한 좋아요 또는 싫어요 상태를 토글합니다.")
    @ApiResponse(responseCode = "200", description = "Toggle Like/Dislike Response", content = @Content(schema = @Schema(implementation = LikeDTO.class)))
    public ResponseEntity<?> toggleLike(@RequestBody LikeDTO likeDTO) {
        logger.info("Received toggleLike Request : {} ", likeDTO);
        LikeDTO like = likeService.toggleLike(likeDTO);
        return ResponseEntity.ok(like);
    }
}
