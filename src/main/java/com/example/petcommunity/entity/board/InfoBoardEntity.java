package com.example.petcommunity.entity.board;

import com.example.petcommunity.entity.member.MemberEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "infoboard")
public class InfoBoardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "info_no")
    private int infoNo;

    @Column(name = "info_title")
    private String infoTitle;

    @Column(name = "info_content")
    private String infoContent;

    @Column(name = "info_category")
    private String infoCategory;

    @Column(name = "info_dogbreed")
    private String infoDogBreed;

    @Column(name = "info_cnt")
    private int infoCnt;

    @Column(name = "info_like")
    private int infoLike;

    @CreationTimestamp
    @Column(name = "info_date", updatable = false)
    private LocalDateTime infoDate;

    @Column(name = "info_upload")
    private String infoUpload;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private MemberEntity userNo;
}
