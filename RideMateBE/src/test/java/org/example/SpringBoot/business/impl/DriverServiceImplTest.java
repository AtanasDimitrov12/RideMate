package org.example.SpringBoot.business.impl;

import org.example.SpringBoot.domain.Driver;
import org.example.SpringBoot.domain.DriverStatus;
import org.example.SpringBoot.domain.RideOption;
import org.example.SpringBoot.exception_handling.DriverNotFoundException;
import org.example.SpringBoot.persistence.repositories.DriverRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DriverServiceImplTest {

    @Mock
    private DriverRepository driverRepository;

    @InjectMocks
    private DriverServiceImpl driverService;

    private Driver driver;

    @BeforeEach
    void setUp() {
        // Create a sample driver. Adjust the setters/constructor based on your implementation.
        driver = new Driver(1L, 1L, "John", "Doe", "235623532", DriverStatus.AVAILABLE, RideOption.PREMIUM);
    }

    @Test
    void getAllDrivers_ShouldReturnListOfDrivers() {
        when(driverRepository.getAll()).thenReturn(List.of(driver));

        List<Driver> drivers = driverService.getAllDrivers();

        assertNotNull(drivers);
        assertEquals(1, drivers.size());
        assertEquals(driver, drivers.get(0));
        verify(driverRepository, times(1)).getAll();
    }

    @Test
    void getDriverById_ShouldReturnDriver_WhenExists() {
        // Note: getDriverById in the service calls getDriverByUserId(id)
        when(driverRepository.getDriverByUserId(1L)).thenReturn(Optional.of(driver));

        Driver result = driverService.getDriverById(1L);

        assertNotNull(result);
        assertEquals(driver, result);
        verify(driverRepository, times(1)).getDriverByUserId(1L);
    }

    @Test
    void getDriverById_ShouldThrowDriverNotFoundException_WhenNotExists() {
        when(driverRepository.getDriverByUserId(1L)).thenReturn(Optional.empty());

        assertThrows(DriverNotFoundException.class, () -> driverService.getDriverById(1L));
    }

    @Test
    void getDriverByUserId_ShouldReturnDriver_WhenExists() {
        when(driverRepository.getDriverByUserId(1L)).thenReturn(Optional.of(driver));

        Driver result = driverService.getDriverByUserId(1L);

        assertNotNull(result);
        assertEquals(driver, result);
        verify(driverRepository, times(1)).getDriverByUserId(1L);
    }

    @Test
    void createDriver_ShouldReturnCreatedDriver() {
        when(driverRepository.create(any(Driver.class))).thenReturn(driver);

        Driver created = driverService.createDriver(driver);

        assertNotNull(created);
        assertEquals(driver, created);
        verify(driverRepository, times(1)).create(driver);
    }

    @Test
    void deleteDriver_ShouldCallRepositoryDelete_WhenDriverExists() {
        when(driverRepository.exists(1L)).thenReturn(true);

        driverService.deleteDriver(1L);

        verify(driverRepository, times(1)).delete(1L);
    }

    @Test
    void deleteDriver_ShouldThrowDriverNotFoundException_WhenDriverDoesNotExist() {
        when(driverRepository.exists(1L)).thenReturn(false);

        assertThrows(DriverNotFoundException.class, () -> driverService.deleteDriver(1L));
    }

    @Test
    void updateDriver_ShouldReturnUpdatedDriver_WhenDriverExists() {
        when(driverRepository.getDriverById(driver.getId())).thenReturn(Optional.of(driver));
        when(driverRepository.update(driver)).thenReturn(driver);

        Driver updated = driverService.updateDriver(driver);

        assertNotNull(updated);
        assertEquals(driver, updated);
        verify(driverRepository, times(1)).getDriverById(driver.getId());
        verify(driverRepository, times(1)).update(driver);
    }

    @Test
    void updateDriver_ShouldThrowDriverNotFoundException_WhenDriverNotExists() {
        when(driverRepository.getDriverById(driver.getId())).thenReturn(Optional.empty());

        assertThrows(DriverNotFoundException.class, () -> driverService.updateDriver(driver));
    }

    @Test
    void changeStatus_ShouldChangeFromOfflineToAvailable() {
        // When driver is OFFLINE, changeStatus should update it to AVAILABLE.
        driver.setStatus(DriverStatus.OFFLINE);
        when(driverRepository.getDriverByUserId(1L)).thenReturn(Optional.of(driver));
        when(driverRepository.exists(driver.getId())).thenReturn(true);

        Driver availableDriver = new Driver();
        availableDriver.setUserId(driver.getUserId());
        availableDriver.setStatus(DriverStatus.AVAILABLE);
        when(driverRepository.changeStatus(1L, DriverStatus.AVAILABLE)).thenReturn(availableDriver);

        Driver result = driverService.changeStatus(1L);

        assertNotNull(result);
        assertEquals(DriverStatus.AVAILABLE, result.getStatus());
        verify(driverRepository, times(1)).changeStatus(1L, DriverStatus.AVAILABLE);
    }

    @Test
    void changeStatus_ShouldKeepStatusWhenOnRide() {
        // When driver is ON_RIDE, the method should pass through the same status.
        driver.setStatus(DriverStatus.ON_RIDE);
        when(driverRepository.getDriverByUserId(1L)).thenReturn(Optional.of(driver));
        when(driverRepository.exists(driver.getId())).thenReturn(true);

        Driver onRideDriver = new Driver();
        onRideDriver.setUserId(driver.getUserId());
        onRideDriver.setStatus(DriverStatus.ON_RIDE);
        when(driverRepository.changeStatus(1L, DriverStatus.ON_RIDE)).thenReturn(onRideDriver);

        Driver result = driverService.changeStatus(1L);

        assertNotNull(result);
        assertEquals(DriverStatus.ON_RIDE, result.getStatus());
        verify(driverRepository, times(1)).changeStatus(1L, DriverStatus.ON_RIDE);
    }

    @Test
    void changeStatus_ShouldChangeToOffline_WhenStatusIsAvailable() {
        // When driver is AVAILABLE, changeStatus should update it to OFFLINE.
        driver.setStatus(DriverStatus.AVAILABLE);
        when(driverRepository.getDriverByUserId(1L)).thenReturn(Optional.of(driver));
        when(driverRepository.exists(driver.getId())).thenReturn(true);

        Driver offlineDriver = new Driver();
        offlineDriver.setUserId(driver.getUserId());
        offlineDriver.setStatus(DriverStatus.OFFLINE);
        when(driverRepository.changeStatus(1L, DriverStatus.OFFLINE)).thenReturn(offlineDriver);

        Driver result = driverService.changeStatus(1L);

        assertNotNull(result);
        assertEquals(DriverStatus.OFFLINE, result.getStatus());
        verify(driverRepository, times(1)).changeStatus(1L, DriverStatus.OFFLINE);
    }

    @Test
    void changeStatus_ShouldThrowDriverNotFoundException_WhenDriverNotFound() {
        when(driverRepository.getDriverByUserId(1L)).thenReturn(Optional.empty());

        assertThrows(DriverNotFoundException.class, () -> driverService.changeStatus(1L));
    }

    @Test
    void countDrivers_ShouldReturnCorrectCount() {
        when(driverRepository.countDrivers()).thenReturn(3L);

        long count = driverService.countDrivers();

        assertEquals(3L, count);
        verify(driverRepository, times(1)).countDrivers();
    }
}
