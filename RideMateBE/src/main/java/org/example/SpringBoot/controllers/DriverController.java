package org.example.SpringBoot.controllers;

import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.business.DriverService;
import org.example.SpringBoot.business.UserService;
import org.example.SpringBoot.controllers.dto.DriverDTO;
import org.example.SpringBoot.controllers.mapper.DriverMapper;
import org.example.SpringBoot.domain.Driver;
import org.example.SpringBoot.domain.DriverStatus;
import org.example.SpringBoot.domain.Role;
import org.example.SpringBoot.domain.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/drivers")
@RequiredArgsConstructor
public class DriverController {
    
    private final DriverService driverService;
    private final UserService userService;
    private final DriverMapper driverMapper;

    @PreAuthorize("hasAnyRole('USER', 'DRIVER', 'ADMIN')")
    @GetMapping("/{id}")
    public DriverDTO getDriverById(@PathVariable Long id) {
        Driver Driver = driverService.getDriverById(id);
        return driverMapper.toDto(Driver);
    }

    @PreAuthorize("hasAnyRole('DRIVER', 'ADMIN')")
    @GetMapping("/status/{id}")
    public DriverStatus getDriverStatusById(@PathVariable Long id) {
        Driver Driver = driverService.getDriverByUserId(id);
        return Driver.getStatus();
    }

    @PreAuthorize("hasRole('DRIVER') or hasRole('ADMIN')")
    @PostMapping
    public DriverDTO createDriver(@RequestBody DriverDTO DriverDTO) {
        Driver createdDriver = driverService.createDriver(driverMapper.toDomain(DriverDTO));
        User user = userService.getUserById(createdDriver.getUserId());
        user.setRole(Role.DRIVER);
        userService.updateUser(user);
        return driverMapper.toDto(createdDriver);
    }

    @PreAuthorize("hasRole('DRIVER') or hasRole('ADMIN')")
    @PutMapping
    public DriverDTO updateDriver(@RequestBody DriverDTO DriverDTO) {
        Driver Driver = driverMapper.toDomain(DriverDTO);
        Driver updatedDriver = driverService.updateDriver(Driver);
        return driverMapper.toDto(updatedDriver);
    }

    @PreAuthorize("hasRole('DRIVER')")
    @PutMapping("/{id}")
    public DriverDTO changeStatus(@PathVariable Long id) {
        Driver driver = driverService.changeStatus(id);
        return driverMapper.toDto(driver);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getTotalDriversCount() {
        long total = driverService.countDrivers();
        return ResponseEntity.ok(total);
    }
}
