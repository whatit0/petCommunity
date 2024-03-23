package com.example.petcommunity.controller.board;

import com.example.petcommunity.dto.board.BoardDTO;
import com.example.petcommunity.dto.board.NoticeDTO;
import com.example.petcommunity.entity.member.MemberEntity;
import com.example.petcommunity.repository.member.MemberRepository;
import com.example.petcommunity.role.UserRole;
import com.example.petcommunity.service.board.NoticeService;
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
public class NoticeController {
    private final NoticeService noticeService;

    @GetMapping("/notices")
    public ResponseEntity<Page<NoticeDTO>> getAllNotices(@PageableDefault(size = 10, sort = "noticeDate", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<NoticeDTO> notices = noticeService.getAllNotices(pageable);
        return ResponseEntity.ok(notices);
    }

    @PostMapping("/noticeWrite")
    public ResponseEntity<?> noticeWrite(@RequestBody NoticeDTO noticeDTO) {
        System.out.println(noticeDTO.toString());
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
}
