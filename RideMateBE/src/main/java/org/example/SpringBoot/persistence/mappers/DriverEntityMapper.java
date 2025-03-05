package org.example.SpringBoot.persistence.mappers;

import lombok.NoArgsConstructor;
import org.example.SpringBoot.domain.Driver;
import org.example.SpringBoot.persistence.entity.DriverEntity;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class DriverEntityMapper {

    public Driver toDomain(DriverEntity driverEntity){
        if (driverEntity == null) {
            return null;
        }

        return new Driver(
            driverEntity.getId(),
            driverEntity.getUserId(),
            driverEntity.getFirstName(),
            driverEntity.getLastName(),
            driverEntity.getLicenseNumber(),
            driverEntity.getStatus()
        );
    }

    public DriverEntity toEntity(Driver driver){
        if (driver == null) {
            return null;
        }

        DriverEntity driverEntity = new DriverEntity();
        driverEntity.setId(driver.getId());
        driverEntity.setUserId(driver.getUserId());
        driverEntity.setFirstName(driver.getFirstName());
        driverEntity.setLastName(driver.getLastName());
        driverEntity.setLicenseNumber(driver.getLicenseNumber());
        driverEntity.setStatus(driver.getStatus());
        return driverEntity;
    }

}
