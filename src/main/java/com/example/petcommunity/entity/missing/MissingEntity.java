package com.example.petcommunity.entity.missing;

import com.example.petcommunity.entity.member.MemberEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "missing")
public class MissingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "missing_no")
    private Long missingNo;

    @Column(name = "missing_placeName")
    private String missingPlaceName;

    @Column(name = "missing_locationAddress")
    private String missingLocationAddress;

    @Column(name = "missing_petType")
    private String missingPetType;

    @Column(name = "missing_description", columnDefinition = "LONGTEXT")
    private String missingDescription;

    @Column(name = "missing_photoUrl")
    private String missingPhotoUrl;

    @Column(name = "missing_lat")
    private Double missingLat;

    @Column(name = "missing_lng")
    private Double missingLng;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private MemberEntity user;
}
