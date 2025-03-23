package org.example.SpringBoot.business;

import org.example.SpringBoot.domain.Driver;

import java.util.List;
import java.util.Optional;

public interface DriverService {
        List<Driver> getAllDrivers();
        Driver getDriverById(Long id);
        Driver getDriverByUserId(Long userId);
        Driver createDriver(Driver driver);
        void deleteDriver(Long id);
        Driver updateDriver(Driver driver);
        Driver changeStatus(Long id);
        long countDrivers();
}
