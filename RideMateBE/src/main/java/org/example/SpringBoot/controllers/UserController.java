package org.example.SpringBoot.controllers;

import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.business.UserService;
import org.example.SpringBoot.controllers.dto.UserDTO;
import org.example.SpringBoot.controllers.mapper.UserMapper;
import org.example.SpringBoot.domain.User;
import org.example.SpringBoot.exception_handling.UserNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers().stream()
                .map(userMapper::toDto)
                .toList();
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return userMapper.toDto(user);
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/by-username/{username}")
    public UserDTO getUserByUsername(@PathVariable String username) {
        User user = userService.findUserByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found: " + username));

        return userMapper.toDto(user);
    }


    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PostMapping
    public UserDTO createUser(@RequestBody UserDTO userDTO) {
        User createdUser = userService.createUser(userMapper.toDomain(userDTO));
        return userMapper.toDto(createdUser);
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PutMapping
    public UserDTO updateUser(@RequestBody UserDTO userDTO) {
        User user = userMapper.toDomain(userDTO);
        User updatedUser = userService.updateUser(user);
        return userMapper.toDto(updatedUser);
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PutMapping("/{Id}/{newPassword}")
    public UserDTO updateUserPassword(@PathVariable Long Id, @PathVariable String newPassword) {

        User updatedUser = userService.updatePassword(Id, newPassword);
        return userMapper.toDto(updatedUser);
    }


    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PutMapping("/{id}")
    public UserDTO deactivateUser(@PathVariable Long id) {
        User deactivatedUser = userService.changeUserStatus(id);
        return userMapper.toDto(deactivatedUser);
    }


    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/deactivated")
    public List<UserDTO> getDeactivatedUsers() {
        return userService.getDeactivatedUsers().stream()
                .map(userMapper::toDto)
                .toList();
    }


    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }


}
