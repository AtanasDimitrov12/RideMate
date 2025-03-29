package org.example.SpringBoot.controllers;

import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.business.DriverRequestService;
import org.example.SpringBoot.business.DriverService;
import org.example.SpringBoot.controllers.dto.DriverDTO;
import org.example.SpringBoot.controllers.dto.DriverRequestDTO;
import org.example.SpringBoot.controllers.mapper.DriverMapper;
import org.example.SpringBoot.controllers.mapper.DriverRequestMapper;
import org.example.SpringBoot.domain.Driver;
import org.example.SpringBoot.domain.DriverRequest;
import org.example.SpringBoot.domain.DriverStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/driver-requests")
@RequiredArgsConstructor
public class DriverRequestController {
    private final DriverRequestService driverRequestService;
    private final DriverRequestMapper driverRequestMapper;
    private final DriverService driverService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public List<DriverRequestDTO> getAll() {
        return driverRequestService.getAll().stream().map(driverRequestMapper::toDto).toList();
    }


    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PostMapping
    public DriverRequestDTO createDriverRequest(@RequestBody DriverRequestDTO driverRequestDTO) {
        DriverRequest createdDriver = driverRequestService.create(driverRequestMapper.toDomain(driverRequestDTO));
        return driverRequestMapper.toDto(createdDriver);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public DriverRequestDTO updateDriverRequest(@RequestBody DriverRequestDTO driverRequestDTO) {
        DriverRequest createdDriver = driverRequestService.update(driverRequestMapper.toDomain(driverRequestDTO));
        return driverRequestMapper.toDto(createdDriver);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        driverRequestService.delete(id);
        return ResponseEntity.noContent().build();
    }



}
