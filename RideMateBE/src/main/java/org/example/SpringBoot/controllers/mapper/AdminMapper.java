package org.example.SpringBoot.controllers.mapper;

import org.example.SpringBoot.controllers.dto.AdminDTO;
import org.example.SpringBoot.domain.Admin;
import org.springframework.stereotype.Component;

@Component
public class AdminMapper {

    public Admin toDomain(AdminDTO adminDTO) {
        if (adminDTO == null) {
            return null;
        }

        return Admin.builder()
                .id(adminDTO.getId())
                .userId(adminDTO.getUserId())
                .department(adminDTO.getDepartment())
                .build();
    }

    public AdminDTO toDto(Admin admin) {
        if (admin == null) {
            return null;
        }

        return AdminDTO.builder()
                .id(admin.getId())
                .userId(admin.getUserId())
                .department(admin.getDepartment())
                .build();
    }
}
