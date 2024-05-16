package com.example.petcommunity.controller.notice;

import com.example.petcommunity.dto.notice.NoticeDTO;
import com.example.petcommunity.service.notice.NoticeDeleteService;
import com.example.petcommunity.service.notice.NoticeEditService;
import com.example.petcommunity.service.notice.NoticeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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
public class NoticeController {
    private final NoticeService noticeService;
    private final NoticeDeleteService noticeDeleteService;
    private final NoticeEditService noticeEditService;

    @GetMapping("/notices")
    @Operation(summary = "공지사항 목록 조회", description = "모든 공지사항을 페이지네이션으로 조회합니다.")
    @ApiResponse(responseCode = "200", description = "공지사항 목록 반환", content = @Content(schema = @Schema(implementation = Page.class)))
    public ResponseEntity<Page<NoticeDTO>> getAllNotices(@PageableDefault(size = 10, sort = "noticeDate", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<NoticeDTO> notices = noticeService.getAllNotices(pageable);
        return ResponseEntity.ok(notices);
    }

    @PostMapping("/noticeWrite")
    @Operation(summary = "공지사항 작성", description = "새로운 공지사항을 등록합니다.")
    @ApiResponse(responseCode = "200", description = "공지사항 등록 성공", content = @Content)
    public ResponseEntity<?> noticeWrite(@RequestBody NoticeDTO noticeDTO) {
//        System.out.println(noticeDTO.toString());
        noticeService.saveNotice(noticeDTO);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/noticeDetail/{noticeNo}")
    @Operation(summary = "공지사항 상세 조회", description = "특정 공지사항의 상세 정보를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "공지사항 상세 정보 반환", content = @Content(schema = @Schema(implementation = NoticeDTO.class)))
    public ResponseEntity<?> getNoticeDetail(@PathVariable int noticeNo) {
        // 조회수 증가
        noticeService.noticeCnt(noticeNo);
        NoticeDTO noticeDTO = noticeService.getNoticeDetail(noticeNo);
        return ResponseEntity.ok(noticeDTO);
    }

    @PostMapping("/noticeEdit")
    @Operation(summary = "공지사항 수정", description = "특정 공지사항을 수정합니다.")
    @ApiResponse(responseCode = "200", description = "공지사항 수정 성공", content = @Content)
    public ResponseEntity<?> noticeEdit(@RequestBody NoticeDTO noticeDTO) {
        int noticeNo = noticeDTO.getNoticeNo();
        noticeEditService.editNotice(noticeNo, noticeDTO);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/delete")
    @Operation(summary = "공지사항 삭제", description = "특정 공지사항을 삭제합니다.")
    @ApiResponse(responseCode = "200", description = "공지사항 삭제 성공", content = @Content)
    public String noticeDelete(@RequestParam int noticeNo) {
        noticeDeleteService.noticeDelete(noticeNo);
        return "삭제 성공";
    }
}
