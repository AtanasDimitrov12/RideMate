package org.example.SpringBoot.persistence.repositories;

import org.example.SpringBoot.domain.Ride;
import org.example.SpringBoot.domain.RideStatus;

import java.util.List;
import java.util.Optional;

public interface RideRepository {
    boolean exists(long id);

    List<Ride> getAll();
    List<Ride> getAllRidesByUserId(Long userId);

    Ride create(Ride ride);

    Ride update(Ride ride);

    void delete(long rideId);

    Optional<Ride> getRideById(long rideId);
    Optional<Ride> getRideByUserId(long userId);

    Ride changeStatus(long rideId, RideStatus status);

    Ride getCurrentRideByUserId(Long userId);
}
