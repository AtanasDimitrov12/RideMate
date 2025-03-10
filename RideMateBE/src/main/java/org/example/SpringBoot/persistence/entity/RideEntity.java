package org.example.SpringBoot.persistence.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.SpringBoot.domain.RideOption;
import org.example.SpringBoot.domain.RideStatus;

import java.time.LocalDateTime;

@Entity
@Table(name = "rides")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RideEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "driver_id", nullable = false)
    private Long driverId;

    @Column(nullable = false)
    private String pickupLocation;

    @Column(nullable = false)
    private String dropOffLocation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RideOption rideOption;

    @Column(nullable = false)
    private Double estimatedFare;

    private Double actualFare;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RideStatus status;

    @Column(nullable = false, updatable = false)
    private LocalDateTime requestTime;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @PrePersist
    protected void onCreate() {
        requestTime = LocalDateTime.now();
    }
}

