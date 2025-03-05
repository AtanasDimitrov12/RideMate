package org.example.SpringBoot.persistence.jpa_repositories;

import org.example.SpringBoot.persistence.entity.VehicleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaVehicleRepository extends JpaRepository<VehicleEntity, Long> {
    Optional<VehicleEntity> getVehicleEntityByDriverId(Long driverId);
}
