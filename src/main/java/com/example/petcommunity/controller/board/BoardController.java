package com.example.petcommunity.controller.board;

import com.example.petcommunity.dto.board.BoardDTO;
import com.example.petcommunity.service.board.impl.BoardServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class BoardController {

    private final BoardServiceImpl boardService;

    @PostMapping("/api/boardWrite")
    public ResponseEntity<?> boardWrite(@RequestBody BoardDTO boardDTO) {
        System.out.println(boardDTO.toString());
        boardService.saveBoard(boardDTO);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/api/boards")
    public ResponseEntity<List<BoardDTO>> getAllBoards() {
        List<BoardDTO> boards = boardService.getAllBoards();
        return ResponseEntity.ok(boards);
    }

    @GetMapping("/api/board/{boardNo}")
    public ResponseEntity<BoardDTO> getBoardDetail(@PathVariable int boardNo) {
        BoardDTO boardDTO = boardService.getBoardDetail(boardNo);
        return ResponseEntity.ok(boardDTO);
    }
}
