package org.example.SpringBoot.business.impl;

import org.example.SpringBoot.business.UserService;
import org.example.SpringBoot.configuration.security.token.AccessToken;
import org.example.SpringBoot.configuration.security.token.AccessTokenEncoder;
import org.example.SpringBoot.configuration.security.token.impl.AccessTokenImpl;
import org.example.SpringBoot.domain.Role;
import org.example.SpringBoot.domain.User;
import org.example.SpringBoot.exception_handling.InvalidCredentialsException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock
    private UserService userService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AccessTokenEncoder accessTokenEncoder;

    @InjectMocks
    private AuthServiceImpl authService;

    private User user;

    @BeforeEach
    void setUp() {
        // Create a sample user with a plain-text password.
        user = new User(
                1L,
                "john",
                "john@example.com",
                "plainPassword",
                "+359888555532",
                null,
                null,
                Role.USER,
                true
        );
    }

    @Test
    void register_ShouldEncodePasswordAndSetRoleAndCreateUser() {
        // Arrange: simulate encoding of the password.
        String encodedPassword = "encodedPassword";
        when(passwordEncoder.encode("plainPassword")).thenReturn(encodedPassword);

        // Act: register the user.
        authService.register(user);

        // Assert: the password is encoded, the role is set to USER,
        // and userService.createUser() is called with the updated user.
        assertEquals(encodedPassword, user.getPassword());
        assertEquals(Role.USER, user.getRole());
        verify(userService, times(1)).createUser(user);
    }

    @Test
    void authenticateUser_ShouldReturnToken_WhenCredentialsAreValid() {
        // Arrange:
        // Simulate the stored user with a hashed password.
        String hashedPassword = "hashedPassword";
        user.setPassword(hashedPassword);
        user.setRole(Role.USER);
        when(userService.findUserByUsername("john")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("plainPassword", hashedPassword)).thenReturn(true);

        // Create an access token instance and simulate encoding.
        AccessToken accessToken = new AccessTokenImpl("john", user.getId(), Set.of(Role.USER.toString()));
        String tokenString = "token123";
        when(accessTokenEncoder.encode(any(AccessToken.class))).thenReturn(tokenString);

        // Act:
        String result = authService.authenticateUser("john", "plainPassword");

        // Assert:
        assertEquals(tokenString, result);
        verify(userService, times(1)).findUserByUsername("john");
        verify(passwordEncoder, times(1)).matches("plainPassword", hashedPassword);
        verify(accessTokenEncoder, times(1)).encode(any(AccessToken.class));
    }

    @Test
    void authenticateUser_ShouldThrowInvalidCredentialsException_WhenUserNotFound() {
        // Arrange:
        when(userService.findUserByUsername("john")).thenReturn(Optional.empty());

        // Act & Assert:
        assertThrows(InvalidCredentialsException.class, () -> authService.authenticateUser("john", "anyPassword"));
    }

    @Test
    void authenticateUser_ShouldThrowInvalidCredentialsException_WhenPasswordDoesNotMatch() {
        // Arrange:
        user.setPassword("hashedPassword");
        when(userService.findUserByUsername("john")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrongPassword", "hashedPassword")).thenReturn(false);

        // Act & Assert:
        assertThrows(InvalidCredentialsException.class, () -> authService.authenticateUser("john", "wrongPassword"));
    }

    @Test
    void verifyPassword_ShouldReturnTrue_WhenPasswordsMatch() {
        // Arrange:
        when(passwordEncoder.matches("inputPassword", "storedPassword")).thenReturn(true);

        // Act:
        boolean result = authService.verifyPassword("storedPassword", "inputPassword");

        // Assert:
        assertTrue(result);
    }

    @Test
    void verifyPassword_ShouldReturnFalse_WhenPasswordsDoNotMatch() {
        // Arrange:
        when(passwordEncoder.matches("inputPassword", "storedPassword")).thenReturn(false);

        // Act:
        boolean result = authService.verifyPassword("storedPassword", "inputPassword");

        // Assert:
        assertFalse(result);
    }
}
