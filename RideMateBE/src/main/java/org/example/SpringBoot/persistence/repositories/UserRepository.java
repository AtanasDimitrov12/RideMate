package org.example.SpringBoot.persistence.repositories;

import org.example.SpringBoot.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    boolean exists(long id);

    List<User> getAll();
    List<User> getDeactivatedUsers();

    List<User> getAll(int pageNumber, int pageSize);

    User create(User user);

    User update(User user);

    User updateUsername(Long userId, String newUsername);

    void delete(long userId);

    void deactivateUser(long userId);

    void activateUser(long userId);

    Optional<User> getUserById(long userId);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    Optional<User> findByUsernameAndIsActive(String username, boolean isActive);

    Optional<User> findByEmailAndIsActive(String email, boolean isActive);

    List<User> findByUsernameContainingIgnoreCase(String partialUsername);

    List<User> findByIsActive(boolean isActive);

    long countByEmail(String email);

}
