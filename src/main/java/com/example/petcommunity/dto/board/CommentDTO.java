package com.example.petcommunity.dto.board;

import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentDTO {
    private int commentNo;
    private String commentContent;
    private LocalDateTime commentDate;
    private int commentLike;
    private int commentunLike;
    private String userName;
    private int boardNo;
}
