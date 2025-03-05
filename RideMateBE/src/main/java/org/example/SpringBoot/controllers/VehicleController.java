package org.example.SpringBoot.controllers;

import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.business.VehicleService;
import org.example.SpringBoot.controllers.dto.VehicleDTO;
import org.example.SpringBoot.controllers.mapper.VehicleMapper;
import org.example.SpringBoot.domain.Vehicle;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {
    
    private final VehicleService VehicleService;
    private final VehicleMapper VehicleMapper;


    @PreAuthorize("hasAnyRole('USER', 'DRIVER', 'ADMIN')")
    @GetMapping
    public List<VehicleDTO> getAllVehicles() {
        return VehicleService.getAllVehicles().stream()
                .map(VehicleMapper::toDto)
                .toList();
    }

    @PreAuthorize("hasAnyRole('USER', 'DRIVER', 'ADMIN')")
    @GetMapping("/{id}")
    public VehicleDTO getVehicleById(@PathVariable Long id) {
        Vehicle Vehicle = VehicleService.getVehicleById(id);
        return VehicleMapper.toDto(Vehicle);
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/user/{userId}")
    public VehicleDTO getVehicleByDriverId(@PathVariable Long driverId) {
        Vehicle Vehicle = VehicleService.getVehicleByDriverId(driverId);
        return VehicleMapper.toDto(Vehicle);
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PostMapping
    public VehicleDTO createVehicle(@RequestBody VehicleDTO VehicleDTO) {

        Vehicle Vehicle = VehicleMapper.toDomain(VehicleDTO);

        Vehicle createdVehicle = VehicleService.createVehicle(Vehicle);
        return VehicleMapper.toDto(createdVehicle);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public VehicleDTO updateVehicle(@RequestBody VehicleDTO VehicleDTO) {
        Vehicle Vehicle = VehicleMapper.toDomain(VehicleDTO);
        Vehicle updatedVehicle = VehicleService.updateVehicle(Vehicle);
        return VehicleMapper.toDto(updatedVehicle);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        VehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }
}
