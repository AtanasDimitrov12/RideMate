package org.example.SpringBoot.persistence.repositories;

import org.example.SpringBoot.domain.Vehicle;

import java.util.List;
import java.util.Optional;

public interface VehicleRepository {
    boolean exists(Long id);

    List<Vehicle> getAll();

    Vehicle create(Vehicle vehicle);

    Vehicle update(Vehicle vehicle);

    void delete(Long vehicleId);

    Optional<Vehicle> getVehicleById(Long vehicleId);

    Optional<Vehicle> getVehicleByDriverId(Long driverId);
}
