package com.example.petcommunity.controller.missing;

import com.example.petcommunity.dto.missing.MissingDTO;
import com.example.petcommunity.entity.missing.MissingEntity;
import com.example.petcommunity.service.missing.impl.MissingServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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
    @Operation(summary = "실종 반려동물 등록", description = "새로운 실종 반려동물 정보를 등록합니다.")
    @ApiResponse(responseCode = "200", description = "등록된 실종 반려동물 정보", content = @Content(schema = @Schema(implementation = MissingEntity.class)))
    public ResponseEntity<?> missingWrite(@RequestBody MissingDTO missingDTO) {
        MissingEntity missing = missingService.saveMissing(missingDTO);
        return ResponseEntity.ok(missing);
    }

    @GetMapping("/getMissing")
    @Operation(summary = "실종 반려동물 목록 조회", description = "등록된 모든 실종 반려동물의 정보를 조회합니다.")
    @ApiResponse(responseCode = "200", description = "실종 반려동물 정보 목록", content = @Content(schema = @Schema(implementation = List.class)))
    public ResponseEntity<?> getMissing() {
        List<MissingDTO> missingDTOS = missingService.getAllMissing();
        return ResponseEntity.ok(missingDTOS);
    }

}
