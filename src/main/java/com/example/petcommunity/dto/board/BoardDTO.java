package com.example.petcommunity.dto.board;


import lombok.*;

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
    private int boardCnt;
    private int Like;
    private int unLike;

    public enum BoardType {
        DAILY,
        QUESTION,
        INFO
    }
}
