package com.example.petcommunity.service.missing.impl;

import com.example.petcommunity.dto.missing.MissingDTO;
import com.example.petcommunity.entity.member.MemberEntity;
import com.example.petcommunity.entity.missing.MissingEntity;
import com.example.petcommunity.repository.member.MemberRepository;
import com.example.petcommunity.repository.missing.MissingRepository;
import com.example.petcommunity.service.missing.MissingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MissingServiceImpl implements MissingService {

    private final MissingRepository missingRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public MissingEntity saveMissing(MissingDTO missingDTO) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findByUserId(authentication.getName());
        if (optionalMemberEntity.isEmpty()) {
            throw new IllegalArgumentException("사용자를 찾을 수 없습니다.");
        }
        MemberEntity memberEntity = optionalMemberEntity.get();

        MissingEntity missing = MissingEntity.builder()
                .missingPlaceName(missingDTO.getMissingPlaceName())
                .missingDescription(missingDTO.getMissingDescription())
                .missingPetType(missingDTO.getMissingPetType())
                .missingLocationAddress(missingDTO.getMissingLocationAddress())
                .missingPhotoUrl(missingDTO.getMissingPhotoUrl())
                .missingLat(missingDTO.getMissingLat())
                .missingLng(missingDTO.getMissingLng())
                .user(memberEntity)
                .build();

        return missingRepository.save(missing);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MissingDTO> getAllMissing() {
        List<MissingEntity> missingEntities = missingRepository.findAll();
        return missingEntities.stream().map(this::convertEntityToDTO).collect(Collectors.toList());
    }

    private MissingDTO convertEntityToDTO(MissingEntity entity) {
        return MissingDTO.builder()
                .missingPlaceName(entity.getMissingPlaceName())
                .missingLocationAddress(entity.getMissingLocationAddress())
                .missingPetType(entity.getMissingPetType())
                .missingDescription(entity.getMissingDescription())
                .missingPhotoUrl(entity.getMissingPhotoUrl())
                .missingLng(entity.getMissingLng())
                .missingLat(entity.getMissingLat())
                .missingUserName(entity.getUser().getUserName())
                .build();
    }
}
