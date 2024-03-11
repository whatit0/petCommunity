package com.example.petcommunity.dto.board;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class LikeDTO {
    private int boardNo;
    private int boardLike;
    private int boardunLike;

    @JsonProperty("isLikeAction")
    private boolean isLikeAction;
}
