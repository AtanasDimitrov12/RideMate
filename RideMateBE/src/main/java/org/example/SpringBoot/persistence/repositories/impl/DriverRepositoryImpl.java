package org.example.SpringBoot.persistence.repositories.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.domain.Driver;
import org.example.SpringBoot.domain.DriverStatus;
import org.example.SpringBoot.persistence.entity.DriverEntity;
import org.example.SpringBoot.persistence.jpa_repositories.JpaDriverRepository;
import org.example.SpringBoot.persistence.mappers.DriverEntityMapper;
import org.example.SpringBoot.persistence.repositories.DriverRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class DriverRepositoryImpl implements DriverRepository {
    
    private final JpaDriverRepository jpaDriverRepository;
    private final DriverEntityMapper driverEntityMapper;

    @Override
    public boolean exists(long id) {
        return jpaDriverRepository.existsById(id);
    }

    @Override
    public List<Driver> getAll() {
        return jpaDriverRepository.findAll().stream()
                .map(driverEntityMapper::toDomain)
                .toList();
    }

    @Override
    public Driver create(Driver driver) {
        DriverEntity DriverEntity = driverEntityMapper.toEntity(driver);
        DriverEntity savedEntity = jpaDriverRepository.save(DriverEntity);
        return driverEntityMapper.toDomain(savedEntity);
    }

    @Override
    public Driver update(Driver driver) {
        DriverEntity DriverEntity = driverEntityMapper.toEntity(driver);
        DriverEntity updatedEntity = jpaDriverRepository.save(DriverEntity);
        return driverEntityMapper.toDomain(updatedEntity);
    }

    @Override
    public void delete(long driverId) {
        jpaDriverRepository.deleteById(driverId);
    }



    @Override
    public Optional<Driver> getDriverById(long DriverId) {
        return jpaDriverRepository.findById(DriverId)
                .map(driverEntityMapper::toDomain);
    }

    @Override
    public Optional<Driver> getDriverByUserId(long userId) {
        return jpaDriverRepository.getDriverByUserId(userId)
                .map(driverEntityMapper::toDomain);
    }

    @Override
    public Driver changeStatus(Long userId, DriverStatus status) {
        DriverEntity driverEntity = jpaDriverRepository.getDriverByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Driver not found with ID: " + userId));

        driverEntity.setStatus(status);
        DriverEntity updatedDriver = jpaDriverRepository.save(driverEntity);

        return driverEntityMapper.toDomain(updatedDriver); // Assuming you have a mapper
    }

}
