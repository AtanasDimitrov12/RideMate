package org.example.SpringBoot.exception_handling;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(HttpStatus.NOT_FOUND)
public class RideNotFoundException extends RuntimeException {

    public RideNotFoundException(Long id) {
        super("Ride not found with ID: " + id);
    }

    public RideNotFoundException(String message) {
        super(message);
    }
}