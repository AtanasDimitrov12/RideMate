package org.example.SpringBoot.business.impl;

import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.business.AuthService;
import org.example.SpringBoot.business.UserService;
import org.example.SpringBoot.configuration.security.token.AccessToken;
import org.example.SpringBoot.configuration.security.token.AccessTokenEncoder;
import org.example.SpringBoot.configuration.security.token.impl.AccessTokenImpl;
import org.example.SpringBoot.domain.Role;
import org.example.SpringBoot.domain.User;
import org.example.SpringBoot.exception_handling.InvalidCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AccessTokenEncoder accessTokenEncoder;

    @Override
    public void register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);

        userService.createUser(user);
    }


    @Override
    public String authenticateUser(String username, String password) {
        Optional<User> userOptional = userService.findUserByUsername(username);

        if (userOptional.isEmpty()) {
            throw new InvalidCredentialsException();
        }
        

        User storedUser = userOptional.get();
        if (!passwordEncoder.matches(password, storedUser.getPassword())) {
            throw new InvalidCredentialsException();
        }

        AccessToken accessToken = new AccessTokenImpl(
                storedUser.getUsername(),
                storedUser.getId(),
                Set.of(storedUser.getRole().toString())
        );
        return accessTokenEncoder.encode(accessToken);
    }


    @Override
    public boolean verifyPassword(String storedPassword, String inputPassword) {
        return passwordEncoder.matches(inputPassword, storedPassword);
    }
}
