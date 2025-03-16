package org.example.SpringBoot.persistence.jpa_repositories;

import org.example.SpringBoot.persistence.entity.DriverEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaDriverRepository extends JpaRepository<DriverEntity, Long> {

    Optional<DriverEntity> getDriverByUserId(Long userId);
}
