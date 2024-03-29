package com.example.petcommunity.controller.notice;

import com.example.petcommunity.dto.notice.NoticeDTO;
import com.example.petcommunity.service.notice.NoticeDeleteService;
import com.example.petcommunity.service.notice.NoticeEditService;
import com.example.petcommunity.service.notice.NoticeService;
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
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class NoticeController {
    private final NoticeService noticeService;
    private final NoticeDeleteService noticeDeleteService;
    private final NoticeEditService noticeEditService;

    @GetMapping("/notices")
    public ResponseEntity<Page<NoticeDTO>> getAllNotices(@PageableDefault(size = 10, sort = "noticeDate", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<NoticeDTO> notices = noticeService.getAllNotices(pageable);
        return ResponseEntity.ok(notices);
    }

    @PostMapping("/noticeWrite")
    public ResponseEntity<?> noticeWrite(@RequestBody NoticeDTO noticeDTO) {
//        System.out.println(noticeDTO.toString());
        noticeService.saveNotice(noticeDTO);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/noticeDetail/{noticeNo}")
    public ResponseEntity<?> getNoticeDetail(@PathVariable int noticeNo) {
        // 조회수 증가
        noticeService.noticeCnt(noticeNo);
        NoticeDTO noticeDTO = noticeService.getNoticeDetail(noticeNo);
        return ResponseEntity.ok(noticeDTO);
    }

    @PostMapping("/noticeEdit")
    public ResponseEntity<?> noticeEdit(@RequestBody NoticeDTO noticeDTO) {
        int noticeNo = noticeDTO.getNoticeNo();
        noticeEditService.editNotice(noticeNo, noticeDTO);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/delete")
    public String noticeDelete(@RequestParam int noticeNo) {
        noticeDeleteService.noticeDelete(noticeNo);
        return "삭제 성공";
    }
}
