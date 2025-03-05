package org.example.SpringBoot.business;

import org.example.SpringBoot.domain.Vehicle;

import java.util.List;

public interface VehicleService {
    List<Vehicle> getAllVehicles();
    Vehicle getVehicleById(Long id);
    Vehicle getVehicleByDriverId(Long driverId);
    Vehicle createVehicle(Vehicle trainer);
    void deleteVehicle(Long id);
    Vehicle updateVehicle(Vehicle trainer);
}
