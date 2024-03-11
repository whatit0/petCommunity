package com.example.petcommunity.controller.board;

import com.example.petcommunity.dto.board.BoardDTO;
import com.example.petcommunity.service.board.impl.BoardServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class BoardController {

    private final BoardServiceImpl boardService;

    @PostMapping("/boardWrite")
    public ResponseEntity<?> boardWrite(@RequestBody BoardDTO boardDTO) {
        System.out.println(boardDTO.toString());
        boardService.saveBoard(boardDTO);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/boards")
    public ResponseEntity<Page<BoardDTO>> getAllBoards(@PageableDefault(size = 10, sort = "boardDate", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<BoardDTO> boards = boardService.getAllBoards(pageable);
        return ResponseEntity.ok(boards);
    }

    @GetMapping("/board/{boardNo}")
    public ResponseEntity<BoardDTO> getBoardDetail(@PathVariable int boardNo) {
        BoardDTO boardDTO = boardService.getBoardDetail(boardNo);
        return ResponseEntity.ok(boardDTO);
    }
}
