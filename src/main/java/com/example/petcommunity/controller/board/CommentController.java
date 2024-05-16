package com.example.petcommunity.controller.board;

import com.example.petcommunity.dto.board.CommentDTO;
import com.example.petcommunity.service.board.impl.CommentServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = "${cross.origin.url}", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class CommentController {

    private final CommentServiceImpl commentService;

    @PostMapping("/comment")
    @Operation(summary = "댓글 생성", description = "게시글에 새로운 댓글을 생성합니다.")
    @ApiResponse(responseCode = "201", description = "Created", content = @Content(schema = @Schema(implementation = CommentDTO.class)))
    public ResponseEntity<CommentDTO> createComment(@io.swagger.v3.oas.annotations.parameters.RequestBody(description = "생성할 댓글 정보") @RequestBody CommentDTO commentDTO) {
        CommentDTO createdComment = commentService.addCommentToBoard(commentDTO);
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }
}
