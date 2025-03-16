package org.example.SpringBoot.persistence.repositories.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.domain.Ride;
import org.example.SpringBoot.domain.RideStatus;
import org.example.SpringBoot.exception_handling.RideNotFoundException;
import org.example.SpringBoot.persistence.entity.RideEntity;
import org.example.SpringBoot.persistence.jpa_repositories.JpaRideRepository;
import org.example.SpringBoot.persistence.mappers.RideEntityMapper;
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

}
