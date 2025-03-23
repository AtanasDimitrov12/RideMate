package org.example.SpringBoot.controllers;

import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.business.DriverService;
import org.example.SpringBoot.business.RideService;
import org.example.SpringBoot.controllers.dto.DriverDTO;
import org.example.SpringBoot.controllers.dto.RideDTO;
import org.example.SpringBoot.controllers.dto.UserDTO;
import org.example.SpringBoot.controllers.mapper.DriverMapper;
import org.example.SpringBoot.controllers.mapper.RideMapper;
import org.example.SpringBoot.controllers.mapper.UserMapper;
import org.example.SpringBoot.domain.Driver;
import org.example.SpringBoot.domain.Ride;
import org.example.SpringBoot.domain.RideStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rides")
@RequiredArgsConstructor
public class RideController {
    
    private final RideService rideService;
    private final DriverService driverService;
    private final RideMapper rideMapper;
    private final UserMapper userMapper;
    private final DriverMapper driverMapper;


    @PreAuthorize("hasAnyRole('USER', 'DRIVER', 'ADMIN')")
    @GetMapping
    public List<RideDTO> getAllRides() {
        return rideService.getAllRides().stream()
                .map(rideMapper::toDto)
                .toList();
    }

    @PreAuthorize("hasAnyRole('DRIVER', 'ADMIN')")
    @GetMapping("drivers/{status}")
    public List<RideDTO> getAllRidesByStatus(@PathVariable RideStatus status) {
        return rideService.getAllRidesByStatus(status).stream()
                .map(rideMapper::toDto)
                .toList();
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/user/{userId}")
    public List<RideDTO> getAllRidesByUserId(@PathVariable Long userId) {
        return rideService.getAllRidesByUserId(userId).stream()
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

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/user/{userId}/current")
    public ResponseEntity<RideDTO> getCurrentRideByUserId(@PathVariable Long userId) {
        Ride currentRide = rideService.getCurrentRideByUserId(userId);
        if (currentRide != null) {
            return ResponseEntity.ok(rideMapper.toDto(currentRide));
        }
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyRole('DRIVER', 'ADMIN')")
    @GetMapping("/driver/{driverId}/current")
    public ResponseEntity<RideDTO> getCurrentRideByDriverId(@PathVariable Long driverId) {
        Driver driver = driverService.getDriverByUserId(driverId);
        Ride currentRide = rideService.getCurrentRideByDriverId(driver.getId());
        if (currentRide != null) {
            return ResponseEntity.ok(rideMapper.toDto(currentRide));
        }
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyRole('DRIVER', 'ADMIN')")
    @PutMapping("/driver/{rideId}/{userId}")
    public RideDTO driverGetRide(@PathVariable Long rideId, @PathVariable Long userId) {
        Driver driver = driverService.getDriverByUserId(userId);
        Ride updatedRide = rideService.driverGetRide(rideId, driver.getId());
        return rideMapper.toDto(updatedRide);
    }

    @PreAuthorize("hasAnyRole('USER', 'DRIVER', 'ADMIN')")
    @PutMapping("/{rideId}/{status}")
    public RideDTO changeStatus(@PathVariable Long rideId, @PathVariable RideStatus status) {

        return rideMapper.toDto(rideService.changeStatus(rideId, status));
    }

    @PreAuthorize("hasAnyRole('USER', 'DRIVER', 'ADMIN')")
    @PutMapping("/finish/{rideId}")
    public RideDTO finishRide(@PathVariable Long rideId) {

        return rideMapper.toDto(rideService.changeStatus(rideId, RideStatus.COMPLETED));
    }

    @GetMapping("/active/user")
    public ResponseEntity<UserDTO> getMostActiveUser() {
        return rideService.getMostActiveUser()
                .map(userMapper::toDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/active/driver")
    public ResponseEntity<DriverDTO> getMostActiveDriver() {
        return rideService.getMostActiveDriver()
                .map(driverMapper::toDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getTotalRidesCount() {
        long total = rideService.countRides();
        return ResponseEntity.ok(total);
    }


}
