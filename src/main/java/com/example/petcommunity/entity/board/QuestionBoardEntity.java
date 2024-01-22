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
@Table(name = "questionBoard")
public class QuestionBoardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_no")
    private int questionNo;

    @Column(name = "question_title")
    private String questionTitle;

    @Column(name = "question_content")
    private String questionContent;

    @Column(name = "question_cnt")
    private int questionCnt;

    @Column(name = "question_like")
    private int questionLike;

    @CreationTimestamp
    @Column(name = "question_date", updatable = false)
    private LocalDateTime questionDate;

    @Column(name = "question_upload")
    private String questionUpload;

    @ManyToOne
    @Column(name = "user_no")
    private MemberEntity userNo;
}
