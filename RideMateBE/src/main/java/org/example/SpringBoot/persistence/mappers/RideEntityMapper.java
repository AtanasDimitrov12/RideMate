package org.example.SpringBoot.persistence.mappers;

import lombok.NoArgsConstructor;
import org.example.SpringBoot.domain.Ride;
import org.example.SpringBoot.persistence.entity.RideEntity;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class RideEntityMapper {

    public Ride toDomain(RideEntity rideEntity){
        if(rideEntity == null){
            return null;
        }

        return new Ride(
                rideEntity.getId(),
                rideEntity.getUserId(),
                rideEntity.getDriverId(),
                rideEntity.getPickupLocation(),
                rideEntity.getDropOffLocation(),
                rideEntity.getEstimatedFare(),
                rideEntity.getActualFare(),
                rideEntity.getStatus(),
                rideEntity.getRequestTime(),
                rideEntity.getStartTime(),
                rideEntity.getEndTime()
        );
    }

    public RideEntity toEntity(Ride ride){
        if(ride == null){
            return null;
        }

        RideEntity rideEntity = new RideEntity();
        rideEntity.setId(ride.getId());
        rideEntity.setUserId(ride.getUserId());
        rideEntity.setDriverId(ride.getDriverId());
        rideEntity.setPickupLocation(ride.getPickupLocation());
        rideEntity.setDropOffLocation(ride.getDropOffLocation());
        rideEntity.setEstimatedFare(ride.getEstimatedFare());
        rideEntity.setActualFare(ride.getActualFare());
        rideEntity.setStatus(ride.getStatus());
        rideEntity.setRequestTime(ride.getRequestTime());
        rideEntity.setStartTime(ride.getStartTime());
        rideEntity.setEndTime(ride.getEndTime());
        return rideEntity;
    }
}
