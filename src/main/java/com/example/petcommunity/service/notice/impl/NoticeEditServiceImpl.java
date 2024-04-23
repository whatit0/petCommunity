package com.example.petcommunity.service.notice.impl;

import com.example.petcommunity.dto.notice.NoticeDTO;
import com.example.petcommunity.entity.notice.NoticeEntity;
import com.example.petcommunity.repository.notice.NoticeRepository;
import com.example.petcommunity.service.notice.NoticeEditService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NoticeEditServiceImpl implements NoticeEditService {

    private final NoticeRepository noticeRepository;

    @Override
    @Transactional
    public void editNotice(int noticeNo, NoticeDTO noticeDTO) {
        NoticeEntity noticeEntity = noticeRepository.findById(noticeNo)
                .orElseThrow(() -> new IllegalArgumentException("해당 번호의 공지사항이 없습니다: " + noticeNo));

        // 공지사항 정보 업데이트
        noticeEntity.setNoticeTitle(noticeDTO.getNoticeTitle());
        noticeEntity.setNoticeContent(noticeDTO.getNoticeContent());
        noticeEntity.setNoticeURL(noticeDTO.getNoticeURL());
        noticeRepository.save(noticeEntity);
    }
}
