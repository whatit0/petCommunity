package com.example.petcommunity.service.missing;

import com.example.petcommunity.dto.missing.MissingDTO;
import com.example.petcommunity.entity.missing.MissingEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MissingService {
    MissingEntity saveMissing(MissingDTO missingDTO);

    List<MissingDTO> getAllMissing();
}
