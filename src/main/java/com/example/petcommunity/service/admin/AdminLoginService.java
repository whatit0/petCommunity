package com.example.petcommunity.service.admin;

import com.example.petcommunity.dto.admin.AdminDTO;
import com.example.petcommunity.security.jwt.admin.JwtAdminToken;
import org.springframework.stereotype.Service;

@Service
public interface AdminLoginService {

    JwtAdminToken adminLogin(AdminDTO adminDTO);
}
