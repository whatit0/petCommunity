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
    private String boardDogBreed;
    private BoardType boardType;

    public enum BoardType {
        DAILY,
        QUESTION,
        INFO
    }
}
