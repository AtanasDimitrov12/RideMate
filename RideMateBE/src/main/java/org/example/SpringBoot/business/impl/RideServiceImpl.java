package org.example.SpringBoot.business.impl;

import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.business.RideService;
import org.example.SpringBoot.domain.Ride;
import org.example.SpringBoot.exception_handling.RideNotFoundException;
import org.example.SpringBoot.persistence.repositories.RideRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RideServiceImpl implements RideService {

    private final RideRepository rideRepository;

    @Override
    public List<Ride> getAllRides() {
        return rideRepository.getAll();
    }

    @Override
    public List<Ride> getAllRidesByUserId(Long userId){
        return rideRepository.getAllRidesByUserId(userId);
    }

    @Override
    public Ride getRideById(Long id) {
        return rideRepository.getRideById(id)
                .orElseThrow(() -> new RideNotFoundException(id));
    }

    @Override
    public Ride getRideByUserId(Long userId){
        return rideRepository.getRideByUserId(userId)
                .orElseThrow(() -> new RideNotFoundException(userId)); // for userId!!!
    }

    @Override
    public Ride createRide(Ride Ride) {

        return rideRepository.create(Ride);
    }

    @Override
    public void deleteRide(Long id) {
        if (!rideRepository.exists(id)) {
            throw new RideNotFoundException(id);
        }
        rideRepository.delete(id);
    }

    @Override
    public Ride updateRide(Ride Ride) {
        Ride existingRide = rideRepository.getRideById(Ride.getId())
                .orElseThrow(() -> new RideNotFoundException("Ride with id " + Ride.getId() + " not found"));

        return rideRepository.update(existingRide);
    }

    @Override
    public Ride getCurrentRideByUserId(Long userId) {

        return rideRepository.getCurrentRideByUserId(userId);
    }


}
