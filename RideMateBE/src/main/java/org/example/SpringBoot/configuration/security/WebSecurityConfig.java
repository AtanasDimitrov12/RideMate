package org.example.SpringBoot.configuration.security;

import org.example.SpringBoot.configuration.security.auth.AuthenticationRequestFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@EnableWebSecurity
@EnableMethodSecurity(jsr250Enabled = true)
@Configuration
public class WebSecurityConfig implements WebMvcConfigurer {

    @Value("${corsheader}")
    private String corsHeader;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity,
                                           AuthenticationEntryPoint authenticationEntryPoint,
                                           AuthenticationRequestFilter authenticationRequestFilter) throws Exception {

        httpSecurity
                .csrf(csrf -> csrf.disable()) // CSRF is disabled because this is a stateless API using JWT for authentication.
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Apply CORS configuration.
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless session management for APIs.
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll() // Authentication endpoints are publicly accessible.
                        .requestMatchers("/user/**").hasRole("USER") // User endpoints require USER role.
                        .requestMatchers("/driver/**").hasRole("DRIVER")
                        .requestMatchers("/admin/**").hasRole("ADMIN") // Admin endpoints require ADMIN role.
                        .requestMatchers("/ws/**").authenticated() // WebSocket endpoints are publicly accessible.
                        .requestMatchers("/api/location/**").permitAll() // Allow location search without authentication

                        .anyRequest().authenticated() // All other requests require authentication.
                )
                .exceptionHandling(ex -> ex.authenticationEntryPoint(authenticationEntryPoint)) // Handle authentication exceptions.
                .addFilterBefore(authenticationRequestFilter, UsernamePasswordAuthenticationFilter.class); // Add custom authentication filter.

        return httpSecurity.build();
    }


    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(corsHeader, "http://localhost:5173")); // Frontend origin
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }



}
