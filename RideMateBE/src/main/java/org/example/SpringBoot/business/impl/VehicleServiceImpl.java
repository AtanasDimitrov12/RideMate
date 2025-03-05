package org.example.SpringBoot.business.impl;

import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.business.VehicleService;
import org.example.SpringBoot.domain.Vehicle;
import org.example.SpringBoot.exception_handling.VehicleNotFoundException;
import org.example.SpringBoot.persistence.repositories.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleServiceImpl implements VehicleService {
    private final VehicleRepository vehicleRepository;

    @Override
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.getAll();
    }

    @Override
    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.getVehicleById(id)
                .orElseThrow(() -> new VehicleNotFoundException(id));
    }

    @Override
    public Vehicle getVehicleByDriverId(Long driverId){
        return vehicleRepository.getVehicleByDriverId(driverId)
                .orElseThrow(() -> new VehicleNotFoundException(driverId)); // For driverId !!!
    }

    @Override
    public Vehicle createVehicle(Vehicle Vehicle) {

        return vehicleRepository.create(Vehicle);
    }

    @Override
    public void deleteVehicle(Long id) {
        if (!vehicleRepository.exists(id)) {
            throw new VehicleNotFoundException(id);
        }
        vehicleRepository.delete(id);
    }

    @Override
    public Vehicle updateVehicle(Vehicle Vehicle) {
        Vehicle existingVehicle = vehicleRepository.getVehicleById(Vehicle.getId())
                .orElseThrow(() -> new VehicleNotFoundException("Vehicle with id " + Vehicle.getId() + " not found"));

        return vehicleRepository.update(existingVehicle);
    }
}
