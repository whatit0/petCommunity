package com.example.petcommunity.service.notice;

import com.example.petcommunity.dto.notice.NoticeDTO;
import org.springframework.stereotype.Service;

@Service
public interface NoticeEditService {

    void editNotice(int noticeNo, NoticeDTO noticeDTO);
}
