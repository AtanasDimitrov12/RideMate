package org.example.SpringBoot.controllers.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.SpringBoot.domain.RideMethod;
import org.example.SpringBoot.domain.RideOption;
import org.example.SpringBoot.domain.RideStatus;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RideDTO {
    private Long id;
    private Long userId;
    private Long driverId;

    private RideMethod method;

    private String pickupLocation;
    private String dropOffLocation;

    private RideOption rideOption;

    private Double estimatedFare;

    private RideStatus status;

    private LocalDateTime requestTime;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
