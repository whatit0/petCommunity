package com.example.petcommunity.service.board;

import com.example.petcommunity.dto.board.NoticeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NoticeService {

    Page<NoticeDTO> getAllNotices(Pageable pageable);

    void saveNotice(NoticeDTO noticeDTO);

    NoticeDTO getNoticeDetail(int noticeNo);

    void noticeCnt(int noticeNo);
}
