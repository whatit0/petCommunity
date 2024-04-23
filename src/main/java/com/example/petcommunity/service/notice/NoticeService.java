package com.example.petcommunity.service.notice;

import com.example.petcommunity.dto.notice.NoticeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NoticeService {

    Page<NoticeDTO> getAllNotices(Pageable pageable);

    void saveNotice(NoticeDTO noticeDTO);

    NoticeDTO getNoticeDetail(int noticeNo);

    void noticeCnt(int noticeNo);
}
