package org.example.SpringBoot.persistence.mappers;

import lombok.NoArgsConstructor;
import org.example.SpringBoot.domain.Admin;
import org.example.SpringBoot.persistence.entity.AdminEntity;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class AdminEntityMapper {
    
    public Admin toDomain(AdminEntity adminEntity){
        if (adminEntity == null) {
            return null;
        }
        return new Admin(
                adminEntity.getId(),
                adminEntity.getUserId(),
                adminEntity.getDepartment()
        );
    }

    public AdminEntity toEntity(Admin admin) {
        if (admin == null) {
            return null;
        }

        AdminEntity adminEntity = new AdminEntity();
        adminEntity.setId(admin.getId());
        adminEntity.setUserId(admin.getUserId());
        adminEntity.setDepartment(admin.getDepartment());

        return adminEntity;
    }
}
