package org.example.SpringBoot.domain;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Ride {
    @Setter(AccessLevel.NONE)
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
