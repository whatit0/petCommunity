package com.example.petcommunity.controller.board;

import com.example.petcommunity.dto.board.CommentDTO;
import com.example.petcommunity.service.board.impl.CommentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class CommentController {

    private final CommentServiceImpl commentService;

    @PostMapping("/comment")
    public ResponseEntity<CommentDTO> createComment(@RequestBody CommentDTO commentDTO) {
        CommentDTO createdComment = commentService.addCommentToBoard(commentDTO);
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }
}
