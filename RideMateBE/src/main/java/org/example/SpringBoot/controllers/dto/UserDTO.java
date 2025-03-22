package org.example.SpringBoot.controllers.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.SpringBoot.domain.Role;

import java.time.LocalDateTime;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String password;
    private String phoneNumber;
    private LocalDateTime createdAt;
    private Role role;
    private Boolean isActive;

}
