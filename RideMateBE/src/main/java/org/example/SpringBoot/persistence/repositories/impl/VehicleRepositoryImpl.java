package org.example.SpringBoot.persistence.repositories.impl;

import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.domain.Vehicle;
import org.example.SpringBoot.persistence.entity.VehicleEntity;
import org.example.SpringBoot.persistence.jpa_repositories.JpaVehicleRepository;
import org.example.SpringBoot.persistence.mappers.VehicleEntityMapper;
import org.example.SpringBoot.persistence.repositories.VehicleRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class VehicleRepositoryImpl implements VehicleRepository {
    
    private final JpaVehicleRepository jpaVehicleRepository;
    private final VehicleEntityMapper vehicleEntityMapper;

    @Override
    public boolean exists(long id) {
        return jpaVehicleRepository.existsById(id);
    }

    @Override
    public List<Vehicle> getAll() {
        return jpaVehicleRepository.findAll().stream()
                .map(vehicleEntityMapper::toDomain)
                .toList();
    }

    @Override
    public Vehicle create(Vehicle trainer) {
        VehicleEntity VehicleEntity = vehicleEntityMapper.toEntity(trainer);
        VehicleEntity savedEntity = jpaVehicleRepository.save(VehicleEntity);
        return vehicleEntityMapper.toDomain(savedEntity);
    }

    @Override
    public Vehicle update(Vehicle trainer) {
        VehicleEntity VehicleEntity = vehicleEntityMapper.toEntity(trainer);
        VehicleEntity updatedEntity = jpaVehicleRepository.save(VehicleEntity);
        return vehicleEntityMapper.toDomain(updatedEntity);
    }

    @Override
    public void delete(long trainerId) {
        jpaVehicleRepository.deleteById(trainerId);
    }



    @Override
    public Optional<Vehicle> getVehicleById(long VehicleId) {
        return jpaVehicleRepository.findById(VehicleId)
                .map(vehicleEntityMapper::toDomain);
    }
}
