package org.example.SpringBoot.exception_handling;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class VehicleNotFoundException extends RuntimeException {

    public VehicleNotFoundException(Long id) {
        super("Vehicle not found with ID: " + id);
    }

    public VehicleNotFoundException(String message) {
        super(message);
    }
}