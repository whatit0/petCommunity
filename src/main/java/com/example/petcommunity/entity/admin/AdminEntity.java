package com.example.petcommunity.entity.admin;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "admin")
public class AdminEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_no")
    private int adminNo;

    @Column(name = "admin_id")
    private String adminId;

    @Column(name = "admin_pwd")
    private String adminPwd;
}
