package org.example.SpringBoot.business.impl;

import org.example.SpringBoot.domain.User;
import org.example.SpringBoot.domain.Role;
import org.example.SpringBoot.exception_handling.UserNotFoundException;
import org.example.SpringBoot.persistence.repositories.UserRepository;
import org.example.SpringBoot.business.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    private User user;

    @BeforeEach
    void setUp() {
        // Construct a sample user.
        // Adjust the constructor parameters as needed.
        user = new User(
                1L,
                "JohnDoe",
                "john@example.com",
                "password123",
                "+359888555532",
                null,
                null,
                Role.USER,
                true
        );
    }

    @Test
    void getAllUsers_ShouldReturnListOfUsers() {
        when(userRepository.getAll()).thenReturn(List.of(user));

        List<User> users = userService.getAllUsers();

        assertNotNull(users);
        assertEquals(1, users.size());
        assertEquals(user, users.get(0));
        verify(userRepository, times(1)).getAll();
    }

    @Test
    void getDeactivatedUsers_ShouldReturnListOfDeactivatedUsers() {
        when(userRepository.getDeactivatedUsers()).thenReturn(List.of(user));

        List<User> users = userService.getDeactivatedUsers();

        assertNotNull(users);
        assertEquals(1, users.size());
        verify(userRepository, times(1)).getDeactivatedUsers();
    }

    @Test
    void getUserById_ShouldReturnUser_WhenUserExists() {
        when(userRepository.getUserById(1L)).thenReturn(Optional.of(user));

        User result = userService.getUserById(1L);

        assertNotNull(result);
        assertEquals(user, result);
        verify(userRepository, times(1)).getUserById(1L);
    }

    @Test
    void getUserById_ShouldThrowUserNotFoundException_WhenUserDoesNotExist() {
        when(userRepository.getUserById(1L)).thenReturn(Optional.empty());

        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> userService.getUserById(1L));
        assertEquals("User not found with ID: 1", exception.getMessage()); // Adjust message if necessary
    }

    @Test
    void createUser_ShouldReturnCreatedUser() {
        when(userRepository.create(any(User.class))).thenReturn(user);

        User createdUser = userService.createUser(user);

        assertNotNull(createdUser);
        assertEquals(user, createdUser);
        verify(userRepository, times(1)).create(any(User.class));
    }

    @Test
    void deleteUser_ShouldDeleteUser_WhenUserExists() {
        when(userRepository.exists(1L)).thenReturn(true);

        userService.deleteUser(1L);

        verify(userRepository, times(1)).delete(1L);
    }

    @Test
    void deleteUser_ShouldThrowUserNotFoundException_WhenUserDoesNotExist() {
        when(userRepository.exists(1L)).thenReturn(false);

        assertThrows(UserNotFoundException.class, () -> userService.deleteUser(1L));
    }

    @Test
    void findUserByUsername_ShouldReturnUser_WhenExists() {
        when(userRepository.findByUsername("JohnDoe")).thenReturn(Optional.of(user));

        Optional<User> foundUser = userService.findUserByUsername("JohnDoe");

        assertTrue(foundUser.isPresent());
        assertEquals(user, foundUser.get());
    }

    @Test
    void findUserByEmail_ShouldReturnUser_WhenExists() {
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));

        Optional<User> foundUser = userService.findUserByEmail("john@example.com");

        assertTrue(foundUser.isPresent());
        assertEquals(user, foundUser.get());
    }

    @Test
    void updateUser_ShouldUpdateAndReturnUser_WhenUserExists() {
        when(userRepository.exists(user.getId())).thenReturn(true);
        when(userRepository.update(any(User.class))).thenReturn(user);

        User updatedUser = userService.updateUser(user);

        assertNotNull(updatedUser);
        assertEquals(user, updatedUser);
        verify(userRepository, times(1)).exists(user.getId());
        verify(userRepository, times(1)).update(user);
    }

    @Test
    void updateUser_ShouldThrowUserNotFoundException_WhenUserDoesNotExist() {
        when(userRepository.exists(user.getId())).thenReturn(false);

        assertThrows(UserNotFoundException.class, () -> userService.updateUser(user));
    }

    @Test
    void updatePassword_ShouldUpdatePassword_WhenUserExists() {
        String newPassword = "newPassword123";
        String encodedPassword = "encodedPassword123";
        when(userRepository.exists(user.getId())).thenReturn(true);
        when(userRepository.getUserById(user.getId())).thenReturn(Optional.of(user));
        when(passwordEncoder.encode(newPassword)).thenReturn(encodedPassword);
        when(userRepository.update(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User updatedUser = userService.updatePassword(user.getId(), newPassword);

        assertNotNull(updatedUser);
        assertEquals(encodedPassword, updatedUser.getPassword());
        verify(userRepository, times(1)).exists(user.getId());
        verify(userRepository, times(1)).getUserById(user.getId());
        verify(passwordEncoder, times(1)).encode(newPassword);
        verify(userRepository, times(1)).update(any(User.class));
    }

    @Test
    void updatePassword_ShouldThrowUserNotFoundException_WhenUserDoesNotExist() {
        when(userRepository.exists(user.getId())).thenReturn(false);

        assertThrows(UserNotFoundException.class, () -> userService.updatePassword(user.getId(), "newPassword123"));
    }

    @Test
    void changeUserStatus_ShouldToggleStatus_WhenUserExists() {
        // Case: User is active - should be deactivated
        user.setIsActive(true);
        when(userRepository.exists(user.getId())).thenReturn(true);
        when(userRepository.getUserById(user.getId())).thenReturn(Optional.of(user));

        User result = userService.changeUserStatus(user.getId());
        verify(userRepository, times(1)).deactivateUser(user.getId());
        assertFalse(result.getIsActive());

        // Reset and test inactive case - should be activated
        user.setIsActive(false);
        when(userRepository.getUserById(user.getId())).thenReturn(Optional.of(user));

        result = userService.changeUserStatus(user.getId());
        verify(userRepository, times(1)).activateUser(user.getId());
        assertTrue(result.getIsActive());
    }

    @Test
    void changeUserStatus_ShouldThrowUserNotFoundException_WhenUserDoesNotExist() {
        when(userRepository.exists(user.getId())).thenReturn(false);

        assertThrows(UserNotFoundException.class, () -> userService.changeUserStatus(user.getId()));
    }

    @Test
    void countUsers_ShouldReturnCorrectCount() {
        when(userRepository.countUsers()).thenReturn(5L);

        long count = userService.countUsers();

        assertEquals(5L, count);
        verify(userRepository, times(1)).countUsers();
    }
}
