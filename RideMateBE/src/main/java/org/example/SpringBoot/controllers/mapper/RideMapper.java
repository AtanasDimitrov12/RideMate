package org.example.SpringBoot.controllers.mapper;

import org.example.SpringBoot.controllers.dto.RideDTO;
import org.example.SpringBoot.domain.Ride;
import org.springframework.stereotype.Component;

@Component
public class RideMapper {

    public Ride toDomain(RideDTO rideDTO) {
        if (rideDTO == null) {
            return null;
        }

        return Ride.builder()
                .id(rideDTO.getId())
                .userId(rideDTO.getUserId())
                .driverId(rideDTO.getDriverId())
                .pickupLocation(rideDTO.getPickupLocation())
                .dropOffLocation(rideDTO.getDropOffLocation())
                .actualFare(rideDTO.getActualFare())
                .estimatedFare(rideDTO.getEstimatedFare())
                .requestTime(rideDTO.getRequestTime())
                .startTime(rideDTO.getStartTime())
                .endTime(rideDTO.getEndTime())
                .status(rideDTO.getStatus())
                .build();
    }

    public RideDTO toDto(Ride ride) {
        if (ride == null) {
            return null;
        }

        return RideDTO.builder()
                .id(ride.getId())
                .userId(ride.getUserId())
                .driverId(ride.getDriverId())
                .pickupLocation(ride.getPickupLocation())
                .dropOffLocation(ride.getDropOffLocation())
                .actualFare(ride.getActualFare())
                .estimatedFare(ride.getEstimatedFare())
                .requestTime(ride.getRequestTime())
                .startTime(ride.getStartTime())
                .endTime(ride.getEndTime())
                .status(ride.getStatus())
                .build();
    }
}
