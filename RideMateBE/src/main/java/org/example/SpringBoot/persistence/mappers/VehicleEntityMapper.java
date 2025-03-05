package org.example.SpringBoot.persistence.mappers;

import lombok.NoArgsConstructor;
import org.example.SpringBoot.domain.Vehicle;
import org.example.SpringBoot.persistence.entity.VehicleEntity;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class VehicleEntityMapper {

    public Vehicle toDomain(VehicleEntity vehicleEntity){
        if(vehicleEntity == null) {
            return null;
        }

        return new Vehicle(
                vehicleEntity.getId(),
                vehicleEntity.getDriverId(),
                vehicleEntity.getBrand(),
                vehicleEntity.getModel(),
                vehicleEntity.getLicensePlate()
        );
    }

    public VehicleEntity toEntity(Vehicle vehicle){
        if(vehicle == null) {
            return null;
        }

        VehicleEntity vehicleEntity = new VehicleEntity();
        vehicleEntity.setId(vehicle.getId());
        vehicleEntity.setDriverId(vehicle.getDriverId());
        vehicleEntity.setBrand(vehicle.getBrand());
        vehicleEntity.setModel(vehicle.getModel());
        vehicleEntity.setLicensePlate(vehicle.getLicensePlate());
        return vehicleEntity;
    }

}
