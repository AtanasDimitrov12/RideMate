package org.example.SpringBoot.persistence.mappers;

import lombok.NoArgsConstructor;
import org.example.SpringBoot.domain.User;
import org.example.SpringBoot.persistence.entity.UserEntity;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class UserEntityMapper {

    public User toDomain(UserEntity userEntity){
        if(userEntity == null){
            return null;
        }

        return new User(
                userEntity.getId(),
                userEntity.getUsername(),
                userEntity.getEmail(),
                userEntity.getPassword(),
                userEntity.getPhoneNumber(),
                userEntity.getCreatedAt(),
                userEntity.getUpdatedAt(),
                userEntity.getRole(),
                userEntity.getIsActive()
        );
    }
    public UserEntity toEntity(User user){
        if(user == null){
            return null;
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setId(user.getId());
        userEntity.setUsername(user.getUsername());
        userEntity.setEmail(user.getEmail());
        userEntity.setPassword(user.getPassword());
        userEntity.setPhoneNumber(user.getPhoneNumber());
        userEntity.setCreatedAt(user.getCreatedAt());
        userEntity.setUpdatedAt(user.getUpdatedAt());
        userEntity.setRole(user.getRole());
        userEntity.setIsActive(user.getIsActive());
        return userEntity;
    }
}
