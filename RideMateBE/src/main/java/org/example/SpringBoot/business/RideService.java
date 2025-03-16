package org.example.SpringBoot.business;

import org.example.SpringBoot.domain.Ride;
import org.example.SpringBoot.domain.RideStatus;

import java.util.List;

public interface RideService {
        List<Ride> getAllRides();
        List<Ride> getAllRidesByStatus(RideStatus status);
        List<Ride> getAllRidesByUserId(Long userId);
        Ride getRideById(Long id);
        Ride createRide(Ride trainer);
        void deleteRide(Long id);
        Ride updateRide(Ride trainer);
        Ride getCurrentRideByUserId(Long userId);
        Ride getCurrentRideByDriverId(Long driverId);
        Ride driverGetRide(Long rideId, Long driverId);
        Ride changeStatus(Long rideId, RideStatus status);
    
}
