package org.example.SpringBoot.business.impl;

import org.example.SpringBoot.domain.Vehicle;
import org.example.SpringBoot.exception_handling.VehicleNotFoundException;
import org.example.SpringBoot.persistence.repositories.VehicleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VehicleServiceImplTest {

    @Mock
    private VehicleRepository vehicleRepository;

    @InjectMocks
    private VehicleServiceImpl vehicleService;

    private Vehicle vehicle;

    @BeforeEach
    void setUp() {
        // Create a sample Vehicle. Adjust the setters/constructor as needed.
        vehicle = new Vehicle(1L, 1L, "Opel", "Astra", "H8345Kl");
    }

    @Test
    void getAllVehicles_ShouldReturnListOfVehicles() {
        when(vehicleRepository.getAll()).thenReturn(List.of(vehicle));

        List<Vehicle> vehicles = vehicleService.getAllVehicles();

        assertNotNull(vehicles);
        assertEquals(1, vehicles.size());
        assertEquals(vehicle, vehicles.get(0));
        verify(vehicleRepository, times(1)).getAll();
    }

    @Test
    void getVehicleById_ShouldReturnVehicle_WhenExists() {
        when(vehicleRepository.getVehicleById(1L)).thenReturn(Optional.of(vehicle));

        Vehicle result = vehicleService.getVehicleById(1L);

        assertNotNull(result);
        assertEquals(vehicle, result);
        verify(vehicleRepository, times(1)).getVehicleById(1L);
    }

    @Test
    void getVehicleById_ShouldThrowVehicleNotFoundException_WhenNotExists() {
        when(vehicleRepository.getVehicleById(1L)).thenReturn(Optional.empty());

        assertThrows(VehicleNotFoundException.class, () -> vehicleService.getVehicleById(1L));
    }

    @Test
    void getVehicleByDriverId_ShouldReturnVehicle_WhenExists() {
        // For driverId test, use a driver id (for example: 10L)
        when(vehicleRepository.getVehicleByDriverId(10L)).thenReturn(Optional.of(vehicle));

        Vehicle result = vehicleService.getVehicleByDriverId(10L);

        assertNotNull(result);
        assertEquals(vehicle, result);
        verify(vehicleRepository, times(1)).getVehicleByDriverId(10L);
    }

    @Test
    void getVehicleByDriverId_ShouldThrowVehicleNotFoundException_WhenNotExists() {
        when(vehicleRepository.getVehicleByDriverId(10L)).thenReturn(Optional.empty());

        assertThrows(VehicleNotFoundException.class, () -> vehicleService.getVehicleByDriverId(10L));
    }

    @Test
    void createVehicle_ShouldReturnCreatedVehicle() {
        when(vehicleRepository.create(vehicle)).thenReturn(vehicle);

        Vehicle createdVehicle = vehicleService.createVehicle(vehicle);

        assertNotNull(createdVehicle);
        assertEquals(vehicle, createdVehicle);
        verify(vehicleRepository, times(1)).create(vehicle);
    }

    @Test
    void deleteVehicle_ShouldCallRepositoryDelete_WhenVehicleExists() {
        when(vehicleRepository.exists(1L)).thenReturn(true);
        doNothing().when(vehicleRepository).delete(1L);

        vehicleService.deleteVehicle(1L);

        verify(vehicleRepository, times(1)).delete(1L);
    }

    @Test
    void deleteVehicle_ShouldThrowVehicleNotFoundException_WhenVehicleDoesNotExist() {
        when(vehicleRepository.exists(1L)).thenReturn(false);

        assertThrows(VehicleNotFoundException.class, () -> vehicleService.deleteVehicle(1L));
    }

    @Test
    void updateVehicle_ShouldReturnUpdatedVehicle_WhenVehicleExists() {
        when(vehicleRepository.getVehicleById(vehicle.getId())).thenReturn(Optional.of(vehicle));
        when(vehicleRepository.update(vehicle)).thenReturn(vehicle);

        Vehicle updatedVehicle = vehicleService.updateVehicle(vehicle);

        assertNotNull(updatedVehicle);
        assertEquals(vehicle, updatedVehicle);
        verify(vehicleRepository, times(1)).getVehicleById(vehicle.getId());
        verify(vehicleRepository, times(1)).update(vehicle);
    }

    @Test
    void updateVehicle_ShouldThrowVehicleNotFoundException_WhenVehicleDoesNotExist() {
        when(vehicleRepository.getVehicleById(vehicle.getId())).thenReturn(Optional.empty());

        assertThrows(VehicleNotFoundException.class, () -> vehicleService.updateVehicle(vehicle));
    }
}
