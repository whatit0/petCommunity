package com.example.petcommunity.entity.notice;

import com.example.petcommunity.entity.member.MemberEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "notice")
public class NoticeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_no")
    private int noticeNo;

    @Column(name = "notice_title")
    private String noticeTitle;

    @Column(name = "notice_content", columnDefinition = "LONGTEXT")
    private String noticeContent;

    @Column(name = "notice_cnt")
    private int noticeCnt;

    @Column(name = "notice_url")
    private String noticeURL;

    @CreationTimestamp
    @Column(name = "notice_date", updatable = false)
    private LocalDateTime noticeDate;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private MemberEntity user;
}
