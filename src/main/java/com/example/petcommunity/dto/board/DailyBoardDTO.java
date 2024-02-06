package com.example.petcommunity.dto.board;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DailyBoardDTO {
    private int dailyNo;
    private String dailyTitle;
    private String dailyContent;
    private String dailyCategory;
    private String dailyDogBreed;
}
