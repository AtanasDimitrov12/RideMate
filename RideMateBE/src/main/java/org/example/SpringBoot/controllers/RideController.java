package org.example.SpringBoot.controllers;

import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.business.RideService;
import org.example.SpringBoot.controllers.dto.RideDTO;
import org.example.SpringBoot.controllers.mapper.RideMapper;
import org.example.SpringBoot.domain.Ride;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rides")
@RequiredArgsConstructor
public class RideController {
    
    private final RideService rideService;
    private final RideMapper rideMapper;


    @PreAuthorize("hasAnyRole('USER', 'DRIVER', 'ADMIN')")
    @GetMapping
    public List<RideDTO> getAllRides() {
        return rideService.getAllRides().stream()
                .map(rideMapper::toDto)
                .toList();
    }

    @PreAuthorize("hasAnyRole('USER', 'DRIVER', 'ADMIN')")
    @GetMapping("/{id}")
    public RideDTO getRideById(@PathVariable Long id) {
        Ride Ride = rideService.getRideById(id);
        return rideMapper.toDto(Ride);
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/user/{userId}")
    public RideDTO getRideByUserId(@PathVariable Long userId) {
        Ride Ride = rideService.getRideByUserId(userId);
        return rideMapper.toDto(Ride);
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PostMapping
    public RideDTO createRide(@RequestBody RideDTO rideDTO) {

        Ride Ride = rideMapper.toDomain(rideDTO);

        Ride createdRide = rideService.createRide(Ride);
        return rideMapper.toDto(createdRide);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public RideDTO updateRide(@RequestBody RideDTO RideDTO) {
        Ride Ride = rideMapper.toDomain(RideDTO);
        Ride updatedRide = rideService.updateRide(Ride);
        return rideMapper.toDto(updatedRide);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRide(@PathVariable Long id) {
        rideService.deleteRide(id);
        return ResponseEntity.noContent().build();
    }
}
