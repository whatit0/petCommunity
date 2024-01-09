package com.example.petcommunity.dto.member;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor // 기본 생성자를 자동으로 만들어준다.
@AllArgsConstructor
@ToString
public class MemberDTO {
    private String userId;
    private String userPwd;
    private String userName;
    private String userNickname;
    private String userAge;
    private String userGender;
    private String userTel;
    private String userAddress;
    private String userCreated;
    private String userUpdated;
}
