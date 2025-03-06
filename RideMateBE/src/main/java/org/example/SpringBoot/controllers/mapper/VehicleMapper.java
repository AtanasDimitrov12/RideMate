package org.example.SpringBoot.controllers.mapper;

import org.example.SpringBoot.controllers.dto.VehicleDTO;
import org.example.SpringBoot.domain.Vehicle;
import org.springframework.stereotype.Component;

@Component
public class VehicleMapper {

    public Vehicle toDomain(VehicleDTO vehicleDTO) {
        if (vehicleDTO == null) {
            return null;
        }

        return Vehicle.builder()
                .id(vehicleDTO.getId())
                .brand(vehicleDTO.getBrand())
                .model(vehicleDTO.getModel())
                .driverId(vehicleDTO.getDriverId())
                .licensePlate(vehicleDTO.getLicensePlate())
                .build();
    }

    public VehicleDTO toDto(Vehicle vehicle) {
        if (vehicle == null) {
            return null;
        }

        return VehicleDTO.builder()
                .id(vehicle.getId())
                .brand(vehicle.getBrand())
                .model(vehicle.getModel())
                .driverId(vehicle.getDriverId())
                .licensePlate(vehicle.getLicensePlate())
                .build();
    }
}
