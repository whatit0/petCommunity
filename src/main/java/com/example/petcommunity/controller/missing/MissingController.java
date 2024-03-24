package com.example.petcommunity.controller.missing;

import com.example.petcommunity.dto.missing.MissingDTO;
import com.example.petcommunity.entity.missing.MissingEntity;
import com.example.petcommunity.service.missing.impl.MissingServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class MissingController {

    private final MissingServiceImpl missingService;

    @PostMapping("/missingWrite")
    public ResponseEntity<?> missingWrite(@RequestBody MissingDTO missingDTO) {
        MissingEntity missing = missingService.saveMissing(missingDTO);
        return ResponseEntity.ok(missing);
    }

    @GetMapping("/getMissing")
    public ResponseEntity<?> getMissing() {
        List<MissingDTO> missingDTOS = missingService.getAllMissing();
        return ResponseEntity.ok(missingDTOS);
    }

}
