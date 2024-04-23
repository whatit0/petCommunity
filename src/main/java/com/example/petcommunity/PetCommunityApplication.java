package com.example.petcommunity;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Pet Community API", version = "v1", description = "Pet Community 애플리케이션의 API 문서 입니다."))
public class PetCommunityApplication {

    public static void main(String[] args) {
        SpringApplication.run(PetCommunityApplication.class, args);
    }

}
