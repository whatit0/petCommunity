package com.example.petcommunity.dto.notice;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoticeDTO {
    private int NoticeNo;
    private String noticeTitle;
    private String noticeContent;
    private int noticeCnt;
    private String noticeURL;
    private LocalDateTime noticeDate;
    private String userName;
}
