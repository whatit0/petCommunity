package com.example.petcommunity.repository.admin;

import com.example.petcommunity.entity.admin.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, Integer> {
    Optional<AdminEntity> findByAdminId(String adminId);
}
