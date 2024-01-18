package com.example.petcommunity.dto.member;

import com.example.petcommunity.entity.member.MemberEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor // 기본 생성자를 자동으로 만들어준다.
@AllArgsConstructor
@ToString
@Builder
public class MemberDTO {
    private String userId;
    private String userPwd;
    private String userName;
    private String userNickname;
    private int userAge;
    private String userGender;
    private String userTel;
    private String userAddress;

    public static MemberDTO toMemberDTO(MemberEntity memberEntity) {
        return MemberDTO.builder()
                .userId(memberEntity.getUserId())
                .userPwd(memberEntity.getUserPwd())
                .userName(memberEntity.getUserName())
                .userNickname(memberEntity.getUserNickname())
                .userAge(memberEntity.getUserAge())
                .userGender(memberEntity.getUserGender())
                .userTel(memberEntity.getUserTel())
                .userAddress(memberEntity.getUserAddress())
                .build();
    }
}

