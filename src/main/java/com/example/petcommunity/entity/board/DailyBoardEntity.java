package com.example.petcommunity.entity.board;


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
@Table(name = "dailyboard")
public class DailyBoardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "daily_no")
    private int dailyNo;

    @Column(name = "daily_title")
    private String dailyTitle;

    @Column(name = "daily_content")
    private String dailyContent;

    @Column(name = "daily_cnt")
    private int dailyCnt;

    @Column(name = "daily_like")
    private int dailyLike;

    @CreationTimestamp
    @Column(name = "daily_date", updatable = false)
    private LocalDateTime dailyDate;

    @Column(name = "daily_upload")
    private String dailyUpload;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private MemberEntity userNo;
}
