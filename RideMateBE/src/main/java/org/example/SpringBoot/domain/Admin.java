package org.example.SpringBoot.domain;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
    @Setter(AccessLevel.NONE)
    private Long id;
    private Long userId;
    private String department;
}
