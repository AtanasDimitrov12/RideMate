package org.example.SpringBoot.controllers.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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

    private String pickupLocation;
    private String dropOffLocation;

    private Double estimatedFare;
    private Double actualFare;

    private RideStatus status;

    private LocalDateTime requestTime;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
