package org.example.SpringBoot.domain;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    @Setter(AccessLevel.NONE)
    private Long id;
    private long driverId;
    private String brand;
    private String model;
    private String licensePlate;

}
