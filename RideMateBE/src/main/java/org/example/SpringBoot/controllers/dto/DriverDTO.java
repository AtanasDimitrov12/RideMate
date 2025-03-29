package org.example.SpringBoot.controllers.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.SpringBoot.domain.DriverStatus;
import org.example.SpringBoot.domain.RideOption;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DriverDTO {
    private Long id;
    private long userId;
    private String firstName;
    private String lastName;
    private String licenseNumber;
    private DriverStatus status;
    private RideOption rideOption;
}
