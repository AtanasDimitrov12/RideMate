package org.example.SpringBoot.persistence.repositories.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.domain.Ride;
import org.example.SpringBoot.domain.RideStatus;
import org.example.SpringBoot.persistence.entity.RideEntity;
import org.example.SpringBoot.persistence.jpa_repositories.JpaRideRepository;
import org.example.SpringBoot.persistence.mappers.RideEntityMapper;
import org.example.SpringBoot.persistence.repositories.RideRepository;
import org.springframework.stereotype.Repository;

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
    public Ride changeStatus(long rideId, RideStatus status){
        RideEntity RideEntity = jpaRideRepository.findById(rideId)
                .orElseThrow(() -> new EntityNotFoundException("Ride not found with ID: " + rideId));

        RideEntity.setStatus(status);
        RideEntity updatedRide = jpaRideRepository.save(RideEntity);

        return rideEntityMapper.toDomain(updatedRide);
    }

}
