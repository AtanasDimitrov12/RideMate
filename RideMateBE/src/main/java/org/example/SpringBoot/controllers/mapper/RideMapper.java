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
                .method(rideDTO.getMethod())
                .driverId(rideDTO.getDriverId())
                .pickupLocation(rideDTO.getPickupLocation())
                .dropOffLocation(rideDTO.getDropOffLocation())
                .rideOption(rideDTO.getRideOption())
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
                .method(ride.getMethod())
                .pickupLocation(ride.getPickupLocation())
                .dropOffLocation(ride.getDropOffLocation())
                .rideOption(ride.getRideOption())
                .estimatedFare(ride.getEstimatedFare())
                .requestTime(ride.getRequestTime())
                .startTime(ride.getStartTime())
                .endTime(ride.getEndTime())
                .status(ride.getStatus())
                .build();
    }
}
