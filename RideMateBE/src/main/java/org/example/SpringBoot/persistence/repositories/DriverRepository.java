package org.example.SpringBoot.persistence.repositories;

import org.example.SpringBoot.domain.Driver;
import org.example.SpringBoot.domain.DriverStatus;

import java.util.List;
import java.util.Optional;

public interface DriverRepository {
    boolean exists(long id);

    List<Driver> getAll();

    Driver create(Driver driver);

    Driver update(Driver driver);

    void delete(long driverId);

    Optional<Driver> getDriverById(long DriverId);

    Driver changeStatus(Long driverId, DriverStatus status);

    Optional<Driver> getDriverByUserId(long userId);

    long countDrivers();

}
