package com.example.petcommunity.controller.board;

import com.example.petcommunity.dto.board.BoardDTO;
import com.example.petcommunity.service.board.impl.BoardServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = "${cross.origin.url}", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class BoardController {

    private final BoardServiceImpl boardService;

    @PostMapping("/boardWrite")
    @Operation(summary = "게시글 작성", description = "새로운 게시글을 작성합니다.")
    @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema(implementation = String.class)))
    public ResponseEntity<?> boardWrite(@RequestBody BoardDTO boardDTO) {
        System.out.println(boardDTO.toString());
        boardService.saveBoard(boardDTO);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/boards")
    @Operation(summary = "게시글 목록 조회", description = "게시글 전체 목록을 페이지네이션으로 조회합니다.")
    @ApiResponse(responseCode = "200", description = "Page<BoardDTO>", content = @Content(schema = @Schema(implementation = Page.class)))
    public ResponseEntity<Page<BoardDTO>> getAllBoards(@PageableDefault(size = 10, sort = "boardDate", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<BoardDTO> boards = boardService.getAllBoards(pageable);
        return ResponseEntity.ok(boards);
    }

    @GetMapping("/board/{boardNo}")
    @Operation(summary = "게시글 상세 조회", description = "특정 게시글의 상세 정보를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "BoardDTO", content = @Content(schema = @Schema(implementation = BoardDTO.class)))
    public ResponseEntity<BoardDTO> getBoardDetail(@PathVariable @io.swagger.v3.oas.annotations.Parameter(description = "게시글 번호") int boardNo) {
        BoardDTO boardDTO = boardService.getBoardDetail(boardNo);
        return ResponseEntity.ok(boardDTO);
    }
}
