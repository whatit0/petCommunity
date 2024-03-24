package com.example.petcommunity.service.board.impl;

import com.example.petcommunity.dto.board.BoardDTO;
import com.example.petcommunity.dto.board.CommentDTO;
import com.example.petcommunity.dto.board.NoticeDTO;
import com.example.petcommunity.entity.board.BoardEntity;
import com.example.petcommunity.entity.board.CommentEntity;
import com.example.petcommunity.entity.board.NoticeEntity;
import com.example.petcommunity.entity.member.MemberEntity;
import com.example.petcommunity.repository.board.NoticeRepository;
import com.example.petcommunity.repository.member.MemberRepository;
import com.example.petcommunity.service.board.NoticeService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.management.RuntimeMBeanException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final MemberRepository memberRepository;
    private final NoticeRepository noticeRepository;


    @Override
    public Page<NoticeDTO> getAllNotices(Pageable pageable) {
        Page<NoticeEntity> noticeEntities = noticeRepository.findAll(pageable);
        Page<NoticeDTO> noticeDTOs = noticeEntities.map(notice -> {
            NoticeDTO dto = convertToNoticedDTO(notice);
            dto.setUserName(notice.getUser().getUserName());
            return dto;
        });
        return noticeDTOs;
    }

    private NoticeDTO convertToNoticedDTO(NoticeEntity noticeEntity) {
        NoticeDTO dto = new NoticeDTO();
        BeanUtils.copyProperties(noticeEntity, dto);
        return dto;
    }

    @Override
    @Transactional
    public void saveNotice(NoticeDTO noticeDTO) throws IllegalArgumentException{
        if (!StringUtils.hasText(noticeDTO.getNoticeTitle())) {
            throw new IllegalArgumentException("게시글 제목은 필수입니다.");
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findByUserId(authentication.getName());

        if (optionalMemberEntity.isEmpty()) {
            throw new IllegalArgumentException("사용자를 찾을 수 없습니다.");
        }
        MemberEntity memberEntity = optionalMemberEntity.get();

        NoticeEntity noticeEntity = NoticeEntity.builder()
                .noticeNo(noticeDTO.getNoticeNo())
                .noticeTitle(noticeDTO.getNoticeTitle())
                .noticeContent(noticeDTO.getNoticeContent())
                .noticeDate(noticeDTO.getNoticeDate())
                .noticeCnt(noticeDTO.getNoticeCnt())
                .noticeURL(noticeDTO.getNoticeURL())
                .user(memberEntity)
                .build();
        noticeRepository.save(noticeEntity);
    }

    @Override
    public NoticeDTO getNoticeDetail(int noticeNo) {
        NoticeEntity notice = noticeRepository.findById(noticeNo)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        NoticeDTO noticeDTO = new NoticeDTO();
        BeanUtils.copyProperties(notice, noticeDTO);
        noticeDTO.setUserName(notice.getUser().getUserName());
        return noticeDTO;
    }

    @Override
    @Transactional
    public void noticeCnt(int noticeNo) {
        noticeRepository.updateCnt(noticeNo);
    }
}
