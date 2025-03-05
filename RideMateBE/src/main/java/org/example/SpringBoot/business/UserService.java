package org.example.SpringBoot.business;

import org.example.SpringBoot.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Long id);
    User createUser(User trainer);
    void deleteUser(Long id);
    Optional<User> findUserByUsername(String username);
    Optional<User> findUserByEmail(String email);
    User updateUser(User trainer);
}
