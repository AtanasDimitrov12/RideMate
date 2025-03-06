package org.example.SpringBoot.controllers;

import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.business.AuthService;
import org.example.SpringBoot.business.UserService;
import org.example.SpringBoot.controllers.dto.UserDTO;
import org.example.SpringBoot.controllers.dto.authentication.JwtResponse;
import org.example.SpringBoot.controllers.dto.authentication.LoginRequest;
import org.example.SpringBoot.controllers.dto.authentication.VerifyPasswordRequest;
import org.example.SpringBoot.domain.User;
import org.example.SpringBoot.exception_handling.InvalidCredentialsException;
import org.example.SpringBoot.exception_handling.UserNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;


    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setPhoneNumber(userDTO.getPhoneNumber());

        authService.register(user);
        return ResponseEntity.ok("User registered successfully");
    }



    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest loginRequest) {
        // User Login Attempt
        Optional<User> userOptional = userService.findUserByUsername(loginRequest.getUsername());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            try {
                String jwtToken = authService.authenticateUser(user.getUsername(), loginRequest.getPassword());
                return ResponseEntity.ok(new JwtResponse(jwtToken));
            } catch (UserNotFoundException e) {
                // Log authentication failure
                throw new UserNotFoundException(e.getMessage());
            }
        }
        // Generic failure response for unauthorized access
        return ResponseEntity.status(401).body(new JwtResponse("Invalid username or password"));
    }


    @PostMapping("/verify-password")
    public ResponseEntity<Boolean> verifyPassword(@RequestBody VerifyPasswordRequest verifyPasswordRequest) {
        try {
            // Check user password
            Optional<User> userOptional = userService.findUserByUsername(verifyPasswordRequest.getUsername());
            if (userOptional.isPresent()) {
                boolean isPasswordValid = authService.verifyPassword(
                        userOptional.get().getPassword(),
                        verifyPasswordRequest.getPassword()
                );
                return ResponseEntity.ok(isPasswordValid);
            }
        } catch (Exception e) {
            throw new InvalidCredentialsException(e.getMessage());
        }

        return ResponseEntity.status(401).body(false);
    }
}
