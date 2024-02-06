package com.example.petcommunity.service.member;

import com.example.petcommunity.entity.member.MemberEntity;
import com.example.petcommunity.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Primary
/*
    1. SecurityConfig의 생성자에 주입할 UserDetailsService 타입의 빈을 찾을 때,
    2. AdminDetailsService와 CustomUserDetailsService 두 개의 클래스 때문에 발생하는 오류를 방지하기 위해
    3. @Primary 사용!
 */
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 여기에서 username 을 실제로는 userId로 해석
        MemberEntity memberEntity = memberRepository.findByUserId(username)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + username));

        // 사용자의 권한 정보 설정 ("ROLE_USER")
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));

        return new User(memberEntity.getUserId(), memberEntity.getUserPwd(), authorities);
    }
}
