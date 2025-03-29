package org.example.SpringBoot.controllers.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DriverRequestDTO {
    private Long id;
    private long userId;
    private String firstName;
    private String lastName;
    private String licenseNumber;
    private String brand;
    private String model;
    private String licensePlate;
}
