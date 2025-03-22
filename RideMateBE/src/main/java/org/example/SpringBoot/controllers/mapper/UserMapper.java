package org.example.SpringBoot.controllers.mapper;

import org.example.SpringBoot.controllers.dto.UserDTO;
import org.example.SpringBoot.domain.User;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class UserMapper {


    public User toDomain(UserDTO userDTO) {
        if (userDTO == null) {
            return null;
        }

        return User.builder()
                .id(userDTO.getId())
                .username(userDTO.getUsername())
                .email(userDTO.getEmail())
                .password(userDTO.getPassword())
                .phoneNumber(userDTO.getPhoneNumber())
                .createdAt(userDTO.getCreatedAt())
                .role(userDTO.getRole())
                .isActive(userDTO.getIsActive())
                .build();
    }

    public UserDTO toDto(User user) {
        if (user == null) {
            return null;
        }

        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .password(user.getPassword())
                .phoneNumber(user.getPhoneNumber())
                .createdAt(user.getCreatedAt())
                .role(user.getRole())
                .isActive(user.getIsActive())
                .build();
    }
}
