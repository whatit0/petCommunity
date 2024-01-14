package com.example.petcommunity.entity.member;

import com.example.petcommunity.dto.member.MemberDTO;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;


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

    @Column(name = "user_addr")
    private String userAddress;

    @CreationTimestamp
    @Column(name = "user_created", updatable = false) // 업데이트시 변경되지 않도록 설정
    private LocalDateTime userCreated;

    @UpdateTimestamp
    @Column(name = "user_updated")
    private LocalDateTime userUpdated;

    public static MemberEntity toMemberEntity(MemberDTO memberDTO) {
        return MemberEntity.builder()
                .userId(memberDTO.getUserId())
                .userPwd(memberDTO.getUserPwd())
                .userName(memberDTO.getUserName())
                .userNickname(memberDTO.getUserNickname())
                .userAge(Integer.parseInt(memberDTO.getUserAge()))
                .userGender(memberDTO.getUserGender())
                .userTel(memberDTO.getUserTel())
                .userAddress(memberDTO.getUserAddress())

                .build();
    }
}
