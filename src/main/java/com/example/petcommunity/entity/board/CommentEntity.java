package com.example.petcommunity.entity.board;

import com.example.petcommunity.entity.member.MemberEntity;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_no")
    private int commentNo;

    @Column(name = "comment_content", columnDefinition = "LONGTEXT")
    private String commentContent;

    @CreationTimestamp
    @Column(name = "comment_date", updatable = false)
    private LocalDateTime commentDate;

    @Column(name = "comment_like")
    private int commentLike;

    @Column(name = "comment_unlike")
    private int commentunLike;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private MemberEntity user;

    @ManyToOne
    @JoinColumn(name = "board_no")
    private BoardEntity board;
}
