package com.example.petcommunity.service.notice.impl;

import com.example.petcommunity.repository.notice.NoticeRepository;
import com.example.petcommunity.service.notice.NoticeDeleteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NoticeDeleteServiceImpl implements NoticeDeleteService {

    private final NoticeRepository noticeRepository;

    @Override
    public void noticeDelete(int noticeNo) {
        noticeRepository.deleteById(noticeNo);
    }
}
