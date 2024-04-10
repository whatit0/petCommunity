package com.example.petcommunity.controller.health;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class AgeController {

    @PostMapping("/api/age")
    @Operation(summary = "반려동물의 인간 나이 계산", description = "반려동물의 나이를 입력받아 인간 나이로 환산하여 반환합니다.")
    @ApiResponse(responseCode = "200", description = "Calculated human age for the pet", content = @Content(schema = @Schema(implementation = AgeResponse.class)))
    public AgeResponse calculateHumanAge(@RequestBody AgeRequest request) {
        String petType = request.getPetType();
        int years = request.getYears();
        int months = request.getMonths();
        String size = request.getSize();

        int humanYears;
        int humanMonths = months % 12; // 남은 개월 수

        if (petType.equals("dog")) {
            humanYears = calculateDogAge(years, months, size);
        } else {
            humanYears = calculateCatAge(years, months);
            humanMonths = (int) Math.round(((months % 12) / 12.0) * 4); // 고양이의 남은 개월 수 계산
        }
        return new AgeResponse(humanYears, humanMonths);
    }

    private int calculateDogAge(int years, int months, String size) {
        int dogAgeInHumanYears = 0;
        if (years > 2) {
            dogAgeInHumanYears += (years - 2) * (size.equals("small") ? 4 : size.equals("medium") ? 5 : 6);
            years = 2;
        }
        dogAgeInHumanYears += years * 24; // 첫 2년은 각각 24년
        return dogAgeInHumanYears;
    }

    private int calculateCatAge(int years, int months) {
        int catAgeInHumanYears = 0;

        if (years >= 2) {
            catAgeInHumanYears = 24 + (years - 2) * 4; // 첫 2년을 제외한 나이 계산
            catAgeInHumanYears += (months / 12.0) * 4; // 개월 수에 대한 추가 계산
        } else if (years == 1) {
            catAgeInHumanYears = (int) (15 + (months / 12.0) * 9); // 두 번째 해의 개월 수 계산
        } else {
            catAgeInHumanYears = (int) ((months / 12.0) * 15); // 첫 해의 개월 수 계산
        }
        return catAgeInHumanYears;
    }




    // AgeRequest 클래스 정의
    @Data
    private static class AgeRequest {
        private String petType;
        private int years;
        private int months;
        private String size; // 'small', 'medium', 'large'
    }

    // AgeResponse 클래스 정의
    @Data
    private static class AgeResponse {
        private int humanYears;
        private int humanMonths;

        public AgeResponse(int humanYears, int humanMonths) {
            this.humanYears = humanYears;
            this.humanMonths = humanMonths;
        }
    }

}
