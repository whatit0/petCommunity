package com.example.petcommunity.entity.member;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Table(name = "user")
/*
    1. Entity는 일종의 테이블 역할(DB의 테이블을 일종의 자바 객체처럼 사용할 수 있다.)
*/
public class MemberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_no")
    private int userNo;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "user_pwd")
    private String userPwd;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "user_nickname")
    private String userNickname;

    @Column(name = "user_age")
    private int userAge;

    @Column(name = "user_gender")
    private String userGender;

    @Column(name = "user_tel")
    private String userTel;

    @Column(name = "user_created")
    private String userCreated;

    @Column(name = "user_updated")
    private String userUpdated;
}
