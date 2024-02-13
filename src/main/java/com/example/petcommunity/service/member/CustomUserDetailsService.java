package com.example.petcommunity.service.member;

import com.example.petcommunity.entity.member.MemberEntity;
import com.example.petcommunity.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 사용자 정보 조회
        MemberEntity memberEntity = memberRepository.findByUserId(username)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + username));

        // 권한 정보 설정
        List<GrantedAuthority> authorities = new ArrayList<>();
        // userRole 값을 기반으로 권한 부여
        if (memberEntity.getUserRole() != null) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + memberEntity.getUserRole().name()));
        }

        return new User(memberEntity.getUserId(), memberEntity.getUserPwd(), authorities);
    }
}
