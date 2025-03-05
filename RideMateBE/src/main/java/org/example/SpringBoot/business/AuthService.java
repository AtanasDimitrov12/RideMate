package org.example.SpringBoot.business;


import org.example.SpringBoot.domain.User;

public interface AuthService {
    void register(User user);
    String authenticateUser(String username, String password);
    boolean verifyPassword(String storedPassword, String inputPassword);
}
