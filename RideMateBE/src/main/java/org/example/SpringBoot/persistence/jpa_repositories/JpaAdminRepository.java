package org.example.SpringBoot.persistence.jpa_repositories;

import org.example.SpringBoot.persistence.entity.AdminEntity;
import org.example.SpringBoot.persistence.entity.DriverEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaAdminRepository extends JpaRepository<AdminEntity, Long> {
    Optional<AdminEntity> findByDepartment(String department);

    Optional<AdminEntity> getAdminByUserId(Long userId);
}
