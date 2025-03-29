package org.example.SpringBoot.domain;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DriverRequest {
    @Setter(AccessLevel.NONE)
    private Long id;
    private Long userId;
    private String firstName;
    private String lastName;
    private String licenseNumber;
    private String brand;
    private String model;
    private String licensePlate;
}
