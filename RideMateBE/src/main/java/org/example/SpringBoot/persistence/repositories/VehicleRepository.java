package org.example.SpringBoot.persistence.repositories;

import org.example.SpringBoot.domain.Vehicle;

import java.util.List;
import java.util.Optional;

public interface VehicleRepository {
    boolean exists(long id);

    List<Vehicle> getAll();

    Vehicle create(Vehicle vehicle);

    Vehicle update(Vehicle vehicle);

    void delete(long vehicleId);

    Optional<Vehicle> getVehicleById(long vehicleId);
}
