package org.example.SpringBoot.persistence.mappers;

import lombok.NoArgsConstructor;
import org.example.SpringBoot.domain.DriverRequest;
import org.example.SpringBoot.persistence.entity.DriverRequestEntity;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class DriverRequestEntityMapper {
    public DriverRequest toDomain(DriverRequestEntity driverRequestEntity){
        if (driverRequestEntity == null) {
            return null;
        }

        return new DriverRequest(
                driverRequestEntity.getId(),
                driverRequestEntity.getUserId(),
                driverRequestEntity.getFirstName(),
                driverRequestEntity.getLastName(),
                driverRequestEntity.getLicenseNumber(),
                driverRequestEntity.getBrand(),
                driverRequestEntity.getModel(),
                driverRequestEntity.getLicensePlate()
        );
    }

    public DriverRequestEntity toEntity(DriverRequest DriverRequest){
        if (DriverRequest == null) {
            return null;
        }

        DriverRequestEntity DriverRequestEntity = new DriverRequestEntity();
        DriverRequestEntity.setId(DriverRequest.getId());
        DriverRequestEntity.setUserId(DriverRequest.getUserId());
        DriverRequestEntity.setFirstName(DriverRequest.getFirstName());
        DriverRequestEntity.setLastName(DriverRequest.getLastName());
        DriverRequestEntity.setLicenseNumber(DriverRequest.getLicenseNumber());
        DriverRequestEntity.setBrand(DriverRequest.getBrand());
        DriverRequestEntity.setModel(DriverRequest.getModel());
        DriverRequestEntity.setLicensePlate(DriverRequest.getLicensePlate());
        return DriverRequestEntity;
    }
}
