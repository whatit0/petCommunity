package com.example.petcommunity.service.admin;

import com.example.petcommunity.dto.member.MemberDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AdminMemberListService {

    List<MemberDTO> getAllMembers();
}
