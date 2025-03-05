package org.example.SpringBoot.configuration.security.token;

public interface AccessTokenEncoder {
    String encode(AccessToken accessToken);
}
