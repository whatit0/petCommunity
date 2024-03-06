package com.example.petcommunity.dto.board;


import lombok.*;
import com.example.petcommunity.entity.board.BoardType;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardDTO {
    private int boardNo;
    private String boardTitle;
    private String boardContent;
    private String boardCategory;
    private String boardDogBreeds;
    private BoardType boardType;
    private int boardLike;
    private int boardunLike;
    private LocalDateTime boardDate;
    private String boardUpload;
    private String userName;

    private List<CommentDTO> comments;
    private int commentCount;

}
