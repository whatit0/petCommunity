package com.example.petcommunity.controller.board;

import com.example.petcommunity.dto.board.DailyBoardDTO;
import com.example.petcommunity.service.board.impl.BoardServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class BoardController {

    private final BoardServiceImpl boardService;

    @PostMapping("/api/boardWrite")
    public ResponseEntity<?> boardWrite(@RequestBody DailyBoardDTO boardDTO) {
        boardService.saveBoard(boardDTO);
        return ResponseEntity.ok("Success");
    }
}
