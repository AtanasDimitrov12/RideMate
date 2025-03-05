package org.example.SpringBoot.controllers.mapper;

import org.example.SpringBoot.controllers.dto.DriverDTO;
import org.example.SpringBoot.domain.Driver;

public class DriverMapper {

    public Driver toDomain(DriverDTO driverDTO) {
        if (driverDTO == null) {
            return null;
        }

        return Driver.builder()
                .id(driverDTO.getId())
                .userId(driverDTO.getUserId())
                .firstName(driverDTO.getFirstName())
                .lastName(driverDTO.getLastName())
                .licenseNumber(driverDTO.getLicenseNumber())
                .build();
    }

    public DriverDTO toDto(Driver driver) {
        if (driver == null) {
            return null;
        }

        return DriverDTO.builder()
                .id(driver.getId())
                .userId(driver.getUserId())
                .firstName(driver.getFirstName())
                .lastName(driver.getLastName())
                .licenseNumber(driver.getLicenseNumber())
                .build();
    }
}
