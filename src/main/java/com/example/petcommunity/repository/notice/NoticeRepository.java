package com.example.petcommunity.repository.notice;

import com.example.petcommunity.entity.notice.NoticeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<NoticeEntity, Integer> {

    @Modifying
    @Query(value = "update NoticeEntity n set n.noticeCnt = n.noticeCnt + 1 where n.noticeNo = :noticeNo")
    void updateCnt(@Param("noticeNo") int noticeNo);
}
