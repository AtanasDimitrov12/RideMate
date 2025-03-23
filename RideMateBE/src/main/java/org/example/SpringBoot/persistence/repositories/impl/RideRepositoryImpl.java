package org.example.SpringBoot.persistence.repositories.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.domain.Driver;
import org.example.SpringBoot.domain.Ride;
import org.example.SpringBoot.domain.RideStatus;
import org.example.SpringBoot.domain.User;
import org.example.SpringBoot.exception_handling.RideNotFoundException;
import org.example.SpringBoot.persistence.entity.DriverEntity;
import org.example.SpringBoot.persistence.entity.RideEntity;
import org.example.SpringBoot.persistence.entity.UserEntity;
import org.example.SpringBoot.persistence.jpa_repositories.JpaRideRepository;
import org.example.SpringBoot.persistence.mappers.DriverEntityMapper;
import org.example.SpringBoot.persistence.mappers.RideEntityMapper;
import org.example.SpringBoot.persistence.mappers.UserEntityMapper;
import org.example.SpringBoot.persistence.repositories.RideRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class RideRepositoryImpl implements RideRepository {
    
    private final JpaRideRepository jpaRideRepository;
    private final RideEntityMapper rideEntityMapper;
    private final UserEntityMapper userEntityMapper;
    private final DriverEntityMapper driverEntityMapper;

    @Override
    public boolean exists(long id) {
        return jpaRideRepository.existsById(id);
    }

    @Override
    public List<Ride> getAll() {
        return jpaRideRepository.findAll().stream()
                .map(rideEntityMapper::toDomain)
                .toList();
    }

    @Override
    public List<Ride> getAllRidesByStatus(RideStatus status) {
        return jpaRideRepository.findRidesByStatus(status).stream()
                .map(rideEntityMapper::toDomain)
                .toList();
    }

    @Override
    public List<Ride> getAllRidesByUserId(Long userId) {
        return jpaRideRepository.getRidesByUserId(userId).stream()
                .map(rideEntityMapper::toDomain)
                .toList();
    }



    @Override
    public Ride create(Ride trainer) {
        RideEntity RideEntity = rideEntityMapper.toEntity(trainer);
        RideEntity savedEntity = jpaRideRepository.save(RideEntity);
        return rideEntityMapper.toDomain(savedEntity);
    }

    @Override
    public Ride update(Ride trainer) {
        RideEntity RideEntity = rideEntityMapper.toEntity(trainer);
        RideEntity updatedEntity = jpaRideRepository.save(RideEntity);
        return rideEntityMapper.toDomain(updatedEntity);
    }

    @Override
    public void delete(long trainerId) {
        jpaRideRepository.deleteById(trainerId);
    }



    @Override
    public Optional<Ride> getRideById(long RideId) {
        return jpaRideRepository.findById(RideId)
                .map(rideEntityMapper::toDomain);
    }

    @Override
    public Optional<Ride> getRideByUserId(long userId){
        return jpaRideRepository.getRideEntityByUserId(userId)
                .map(rideEntityMapper::toDomain);
    }

    @Override
    public Ride changeStatus(long rideId, RideStatus status){
        RideEntity RideEntity = jpaRideRepository.findById(rideId)
                .orElseThrow(() -> new EntityNotFoundException("Ride not found with ID: " + rideId));

        if(status == RideStatus.COMPLETED)
        {
            RideEntity.setEndTime(LocalDateTime.now());
        }
        RideEntity.setStatus(status);
        RideEntity updatedRide = jpaRideRepository.save(RideEntity);

        return rideEntityMapper.toDomain(updatedRide);
    }

    @Override
    public Ride getCurrentRideByUserId(Long userId){

        return rideEntityMapper.toDomain(jpaRideRepository.findFirstByUserIdAndStatusIn(
                userId, List.of("REQUESTED", "ACCEPTED")
        ).orElse(null));
    }

    @Override
    public Ride getCurrentRideByDriverId(Long driverId){

        return rideEntityMapper.toDomain(jpaRideRepository.findFirstByDriverIdAndStatus(
                driverId, RideStatus.ACCEPTED
        ).orElse(null));
    }

    @Override
    public Ride driverGetRide(Long rideId, Long driverId){

        RideEntity rideEntity = jpaRideRepository.findById(rideId).orElseThrow(() -> new RideNotFoundException("Ride not found with ID: " + rideId));
        rideEntity.setDriverId(driverId);
        rideEntity.setStartTime(LocalDateTime.now());
        rideEntity.setStatus(RideStatus.ACCEPTED);
        return rideEntityMapper.toDomain(jpaRideRepository.save(rideEntity));

    }

    // New method: Get the most active user (the user with the most rides)
    @Override
    public Optional<User> getMostActiveUser() {
        Optional<UserEntity> userEntity = jpaRideRepository.findMostActiveUser();
        return userEntity.map(userEntityMapper::toDomain);
    }

    // New method: Get the most active driver (the driver with the most rides)
    @Override
    public Optional<Driver> getMostActiveDriver() {
        Optional<DriverEntity> driverEntity = jpaRideRepository.findMostActiveDriver();
        return driverEntity.map(driverEntityMapper::toDomain);
    }

    @Override
    public long countRides() {
        return jpaRideRepository.count();
    }

}
