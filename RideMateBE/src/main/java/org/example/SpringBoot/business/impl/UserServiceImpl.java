package org.example.SpringBoot.business.impl;

import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.business.UserService;
import org.example.SpringBoot.domain.User;
import org.example.SpringBoot.exception_handling.UserNotFoundException;
import org.example.SpringBoot.persistence.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<User> getAllUsers() {
        return userRepository.getAll();
    }

    @Override
    public List<User> getDeactivatedUsers() {
        return userRepository.getDeactivatedUsers();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.getUserById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @Override
    public User createUser(User user) {
        return userRepository.create(user);
    }



    @Override
    public void deleteUser(Long id) {
        if (userRepository.exists(id)) {
            userRepository.delete(id);
        } else {
            throw new UserNotFoundException(id);
        }
    }

    @Override
    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }


    @Override
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User updateUser(User user) {
        if (userRepository.exists(user.getId())) {


            return userRepository.update(user);
        } else {
            throw new UserNotFoundException(user.getId());
        }
    }

    @Override
    public User updatePassword(Long Id, String newPassword) {
        if (userRepository.exists(Id)) {
            User user = userRepository.getUserById(Id).orElseThrow(() -> new UserNotFoundException(Id));
            user.setPassword(passwordEncoder.encode(newPassword));
            return userRepository.update(user);
        } else {
            throw new UserNotFoundException(Id);
        }
    }


    @Override
    public User changeUserStatus(Long id) {
        if (userRepository.exists(id)) {
            User user = userRepository.getUserById(id).orElseThrow(() -> new UserNotFoundException(id));
            if (user.getIsActive())
            {
                userRepository.deactivateUser(id);
                user.setIsActive(false);
            }
            else {
                userRepository.activateUser(id);
                user.setIsActive(true);
            }
            return user;
        } else {
            throw new UserNotFoundException(id);
        }

    }

    @Override
    public long countUsers() {
        return userRepository.countUsers();
    }



}

