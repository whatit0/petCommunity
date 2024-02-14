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
@Table(name = "board")
public class BoardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_no")
    private int boardNo;

    @Column(name = "board_title")
    private String boardTitle;

    @Lob
    @Column(name = "board_content")
    private String boardContent;

    @Enumerated(EnumType.STRING)
    @Column(name = "board_type")
    private BoardType boardType;

    @Column(name = "board_category") // 개, 고양이, 기타소동물
    private String boardCategory;

    @Column(name = "board_dogbreeds")
    private String boardDogBreeds;

    @Column(name = "board_cnt")
    private int boardCnt;

    @Column(name = "board_like")
    private int boardLike;

    @CreationTimestamp
    @Column(name = "board_date", updatable = false)
    private LocalDateTime boardDate;

    @Column(name = "board_upload")
    private String boardUpload;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private MemberEntity userNo;
}

enum BoardType {
    DAILY,
    QUESTION,
    INFO
}