package com.example.petcommunity.entity.board;

import com.example.petcommunity.entity.member.MemberEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_board_like")
public class UserBoardLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private MemberEntity user;

    @ManyToOne
    @JoinColumn(name = "board_no")
    private BoardEntity board;

    @Column(name = "is_liked")
    private Boolean isLiked;
}
