package org.example.SpringBoot.persistence.jpa_repositories;

import org.example.SpringBoot.persistence.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface JpaUserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByUsername(String username);
    Optional<UserEntity> findByUsernameAndIsActive(String username, boolean isActive);
    Optional<UserEntity> findByEmailAndIsActive(String email, boolean isActive);
    List<UserEntity> findByUsernameContainingIgnoreCase(String partialUsername);
    List<UserEntity> findByIsActive(boolean isActive);
    long countByEmail(String email);
    long countByIsActive(boolean isActive);

    @Query("SELECT u FROM UserEntity u WHERE u.isActive = false")
    List<UserEntity> findAllDeactivatedUsers();

}
