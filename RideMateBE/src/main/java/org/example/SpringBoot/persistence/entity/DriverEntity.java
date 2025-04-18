package org.example.SpringBoot.persistence.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.SpringBoot.domain.DriverStatus;
import org.example.SpringBoot.domain.RideOption;

@Entity
@Table(name = "drivers")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DriverEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String licenseNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DriverStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RideOption rideOption;
}

