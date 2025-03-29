package org.example.SpringBoot.controllers.mapper;

import org.example.SpringBoot.controllers.dto.DriverRequestDTO;
import org.example.SpringBoot.domain.DriverRequest;
import org.springframework.stereotype.Component;

@Component
public class DriverRequestMapper {
    public DriverRequest toDomain(DriverRequestDTO DriverRequestDTO) {
        if (DriverRequestDTO == null) {
            return null;
        }

        return DriverRequest.builder()
                .id(DriverRequestDTO.getId())
                .userId(DriverRequestDTO.getUserId())
                .firstName(DriverRequestDTO.getFirstName())
                .lastName(DriverRequestDTO.getLastName())
                .licenseNumber(DriverRequestDTO.getLicenseNumber())
                .brand(DriverRequestDTO.getBrand())
                .model(DriverRequestDTO.getModel())
                .licensePlate(DriverRequestDTO.getLicensePlate())
                .build();
    }

    public DriverRequestDTO toDto(DriverRequest DriverRequest) {
        if (DriverRequest == null) {
            return null;
        }

        return DriverRequestDTO.builder()
                .id(DriverRequest.getId())
                .userId(DriverRequest.getUserId())
                .firstName(DriverRequest.getFirstName())
                .lastName(DriverRequest.getLastName())
                .licenseNumber(DriverRequest.getLicenseNumber())
                .brand(DriverRequest.getBrand())
                .model(DriverRequest.getModel())
                .licensePlate(DriverRequest.getLicensePlate())
                .build();
    }
}
