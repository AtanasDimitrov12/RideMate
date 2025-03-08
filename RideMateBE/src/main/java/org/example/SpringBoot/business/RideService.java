package org.example.SpringBoot.business;

import org.example.SpringBoot.domain.Ride;

import java.util.List;

public interface RideService {
        List<Ride> getAllRides();
        List<Ride> getAllRidesByUserId(Long userId);
        Ride getRideById(Long id);
        Ride getRideByUserId(Long userId);
        Ride createRide(Ride trainer);
        void deleteRide(Long id);
        Ride updateRide(Ride trainer);
        Ride getCurrentRideByUserId(Long userId);
    
}
