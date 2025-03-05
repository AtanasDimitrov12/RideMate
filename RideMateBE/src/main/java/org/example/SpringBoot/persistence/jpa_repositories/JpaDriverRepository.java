package org.example.SpringBoot.persistence.jpa_repositories;

import org.example.SpringBoot.persistence.entity.DriverEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaDriverRepository extends JpaRepository<DriverEntity, Long> {
}
