package org.example.SpringBoot.domain;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Driver {
    @Setter(AccessLevel.NONE)
    private Long id;
    private long userId;
    private String firstName;
    private String lastName;
    private String licenseNumber;
    private DriverStatus status;

}
