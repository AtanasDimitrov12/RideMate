package org.example.SpringBoot.persistence.repositories;

import org.example.SpringBoot.domain.Driver;
import org.example.SpringBoot.domain.Ride;
import org.example.SpringBoot.domain.RideStatus;
import org.example.SpringBoot.domain.User;

import java.util.List;
import java.util.Optional;

public interface RideRepository {
    boolean exists(long id);

    List<Ride> getAll();
    List<Ride> getAllRidesByStatus(RideStatus status);
    List<Ride> getAllRidesByUserId(Long userId);

    Ride create(Ride ride);

    Ride update(Ride ride);

    void delete(long rideId);

    Optional<Ride> getRideById(long rideId);
    Optional<Ride> getRideByUserId(long userId);

    Ride changeStatus(long rideId, RideStatus status);

    Ride getCurrentRideByUserId(Long userId);

    Ride getCurrentRideByDriverId(Long driverId);

    Ride driverGetRide(Long rideId, Long driverId);

    Optional<User> getMostActiveUser();
    Optional<Driver> getMostActiveDriver();
    long countRides();

}
