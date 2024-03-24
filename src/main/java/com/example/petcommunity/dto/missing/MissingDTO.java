package com.example.petcommunity.dto.missing;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MissingDTO {
    private String missingPlaceName;
    private String missingLocationAddress;
    private String missingPetType;
    private String missingDescription;
    private String missingPhotoUrl;
    private String missingUserName;
    private Double missingLat;
    private Double missingLng;
}
