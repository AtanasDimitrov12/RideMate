package org.example.SpringBoot.configuration.security.token.impl;


import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.example.SpringBoot.configuration.security.token.AccessToken;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;

@EqualsAndHashCode
@Getter
public class AccessTokenImpl implements AccessToken {
    private final String subject;
    private final Long userId;
    private final Set<String> roles;

    public AccessTokenImpl(String subject, Long userId, Collection<String> roles) {
        this.subject = subject;
        this.userId = userId;
        this.roles = roles != null ? Set.copyOf(roles) : Collections.emptySet();
    }
}
