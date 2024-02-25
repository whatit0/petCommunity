package com.example.petcommunity.controller.health;

import lombok.Data;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST}, allowCredentials = "true")
public class CalorieController {

    @PostMapping("/api/calorie")
    public CalorieResponse calculateCalorie(@RequestBody CalorieRequest request) {
        double weight = request.getWeight();
        String petType = request.getPetType();

        if ("dog".equals(petType)) {
            double dogRer = calculateDogRer(weight);
            double factor = getFactorFromCondition(request.getCondition(), "dog");
            double dogCalorie = dogRer * factor;
            return new CalorieResponse(0.0, 0.0, dogRer, dogCalorie); // 고양이 값은 0.0으로 설정
        } else if ("cat".equals(petType)) {
            double catRer = calculateCatRer(weight);
            double factor = getFactorFromCondition(request.getCondition(), "cat");
            double catCalorie = catRer * factor;
            return new CalorieResponse(catRer, catCalorie, 0.0, 0.0); // 강아지 값은 0.0으로 설정
        } else {
            throw new IllegalArgumentException("Invalid pet type: " + petType);
        }
    }


    private double calculateDogRer(double weight) {
        if (weight < 2) {
            return 70 * Math.pow(weight, 0.75);
        } else if (weight < 45) {
            return 30 * weight + 70;
        } else {
            return 70 * Math.pow(weight, 0.75);
        }
    }

    private double calculateCatRer(double weight) {
        return 70 * Math.pow(weight, 0.75);
    }

    private double getFactorFromCondition(String condition, String petType) {
        if ("dog".equals(petType)) {
            switch (condition) {
                case "dogHealthy1":
                    return 3.0;
                case "dogHealthy2":
                    return 2.0;
                case "dogHealthy3":
                    return 1.6;
                case "dogHealthy4":
                    return 1.8;
                case "dogHealthy5":
                    return 1.0;
                case "dogHealthy6":
                    return 1.7;
                case "dogHealthy7":
                    return 2.0;
                case "dogHealthy8":
                    return 3.0;
                case "dogHealthy9":
                    return 4.0;
                case "dogHealthy10":
                    return 1.8;
                case "dogHealthy11":
                    return 3.0;
            }
        } else if ("cat".equals(petType)) {
            switch (condition) {
                case "catHealthy1":
                    return 3.0;
                case "catHealthy2":
                    return 2.5;
                case "catHealthy3":
                    return 2.0;
                case "catHealthy4":
                    return 1.4;
                case "catHealthy5":
                    return 1.2;
                case "catHealthy6":
                    return 1.6;
                case "catHealthy7":
                    return 0.7;
                case "catHealthy8":
                    return 0.8;
            }
        }
        throw new IllegalArgumentException("Invalid condition: " + condition);
    }


    // 요청을 위한 내부 클래스
    @Data
    private static class CalorieRequest {
        private String petType;
        private double weight;
        private String condition;
    }

    // 응답을 위한 내부 클래스
    @Data
    private static class CalorieResponse {
        private double dogRer;
        private double dogCalorie;
        private double catRer;
        private double catCalorie;


        public CalorieResponse(double catRer, double catCalorie, double dogRer ,double dogCalorie) {
            this.dogRer = dogRer;
            this.dogCalorie = dogCalorie;
            this.catRer = catRer;
            this.catCalorie = catCalorie;
        }
    }
}
