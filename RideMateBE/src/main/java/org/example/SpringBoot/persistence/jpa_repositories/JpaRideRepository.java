package org.example.SpringBoot.persistence.jpa_repositories;

import org.example.SpringBoot.persistence.entity.RideEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaRideRepository extends JpaRepository<RideEntity, Long> {

    Optional<RideEntity> getRideEntityByUserId(Long id);
}
