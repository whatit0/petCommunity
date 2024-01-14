package com.example.petcommunity.repository.member;

import com.example.petcommunity.entity.member.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Integer> {
    Optional<MemberEntity> findByUserId(String userId); // 로그인
}
