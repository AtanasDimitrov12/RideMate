package org.example.SpringBoot.business.impl;

import org.example.SpringBoot.domain.*;
import org.example.SpringBoot.exception_handling.RideNotFoundException;
import org.example.SpringBoot.persistence.repositories.RideRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RideServiceImplTest {

    @Mock
    private RideRepository rideRepository;

    @InjectMocks
    private RideServiceImpl rideService;

    private Ride ride;
    private User user;
    private Driver driver;

    @BeforeEach
    void setUp() {
        // Create a sample Ride instance.
        ride = new Ride(1L, 1L, 1L, RideMethod.TAXI, "Fontys University", "Eindhoven Centraal", RideOption.ECONOMY, 10.0,RideStatus.REQUESTED , LocalDateTime.now(),LocalDateTime.now() ,null  );

        // Create a sample User and Driver instance for tests using getMostActiveUser/Driver.
        user = new User(
                1L,
                "JohnDoe",
                "john@example.com",
                "password123",
                "+359888555532",
                null,
                null,
                Role.USER,
                true
        );

        driver = new Driver(1L, 1L, "John", "Doe", "235623532", DriverStatus.AVAILABLE, RideOption.PREMIUM);

    }

    @Test
    void getAllRides_ShouldReturnListOfRides() {
        when(rideRepository.getAll()).thenReturn(List.of(ride));

        List<Ride> rides = rideService.getAllRides();

        assertNotNull(rides);
        assertEquals(1, rides.size());
        assertEquals(ride, rides.get(0));
        verify(rideRepository, times(1)).getAll();
    }

    @Test
    void getAllRidesByStatus_ShouldReturnRidesWithGivenStatus() {
        RideStatus status = RideStatus.REQUESTED;
        when(rideRepository.getAllRidesByStatus(status)).thenReturn(List.of(ride));

        List<Ride> rides = rideService.getAllRidesByStatus(status);

        assertNotNull(rides);
        assertEquals(1, rides.size());
        assertEquals(ride, rides.get(0));
        verify(rideRepository, times(1)).getAllRidesByStatus(status);
    }

    @Test
    void getAllRidesByUserId_ShouldReturnRidesForUser() {
        Long userId = 10L;
        when(rideRepository.getAllRidesByUserId(userId)).thenReturn(List.of(ride));

        List<Ride> rides = rideService.getAllRidesByUserId(userId);

        assertNotNull(rides);
        assertEquals(1, rides.size());
        assertEquals(ride, rides.get(0));
        verify(rideRepository, times(1)).getAllRidesByUserId(userId);
    }

    @Test
    void getRideById_ShouldReturnRide_WhenExists() {
        when(rideRepository.getRideById(1L)).thenReturn(Optional.of(ride));

        Ride result = rideService.getRideById(1L);

        assertNotNull(result);
        assertEquals(ride, result);
        verify(rideRepository, times(1)).getRideById(1L);
    }

    @Test
    void getRideById_ShouldThrowRideNotFoundException_WhenNotExists() {
        when(rideRepository.getRideById(1L)).thenReturn(Optional.empty());

        assertThrows(RideNotFoundException.class, () -> rideService.getRideById(1L));
    }

    @Test
    void createRide_ShouldReturnCreatedRide() {
        when(rideRepository.create(ride)).thenReturn(ride);

        Ride createdRide = rideService.createRide(ride);

        assertNotNull(createdRide);
        assertEquals(ride, createdRide);
        verify(rideRepository, times(1)).create(ride);
    }

    @Test
    void deleteRide_ShouldCallRepositoryDelete_WhenRideExists() {
        when(rideRepository.exists(1L)).thenReturn(true);
        doNothing().when(rideRepository).delete(1L);

        rideService.deleteRide(1L);

        verify(rideRepository, times(1)).delete(1L);
    }

    @Test
    void deleteRide_ShouldThrowRideNotFoundException_WhenRideDoesNotExist() {
        when(rideRepository.exists(1L)).thenReturn(false);

        assertThrows(RideNotFoundException.class, () -> rideService.deleteRide(1L));
    }

    @Test
    void updateRide_ShouldReturnUpdatedRide_WhenRideExists() {
        when(rideRepository.getRideById(ride.getId())).thenReturn(Optional.of(ride));
        when(rideRepository.update(ride)).thenReturn(ride);

        Ride updatedRide = rideService.updateRide(ride);

        assertNotNull(updatedRide);
        assertEquals(ride, updatedRide);
        verify(rideRepository, times(1)).getRideById(ride.getId());
        verify(rideRepository, times(1)).update(ride);
    }

    @Test
    void updateRide_ShouldThrowRideNotFoundException_WhenRideDoesNotExist() {
        when(rideRepository.getRideById(ride.getId())).thenReturn(Optional.empty());

        assertThrows(RideNotFoundException.class, () -> rideService.updateRide(ride));
    }

    @Test
    void getCurrentRideByUserId_ShouldReturnRide() {
        Long userId = 10L;
        when(rideRepository.getCurrentRideByUserId(userId)).thenReturn(ride);

        Ride result = rideService.getCurrentRideByUserId(userId);

        assertNotNull(result);
        assertEquals(ride, result);
        verify(rideRepository, times(1)).getCurrentRideByUserId(userId);
    }

    @Test
    void getCurrentRideByDriverId_ShouldReturnRide() {
        Long driverId = 20L;
        when(rideRepository.getCurrentRideByDriverId(driverId)).thenReturn(ride);

        Ride result = rideService.getCurrentRideByDriverId(driverId);

        assertNotNull(result);
        assertEquals(ride, result);
        verify(rideRepository, times(1)).getCurrentRideByDriverId(driverId);
    }

    @Test
    void driverGetRide_ShouldReturnRide() {
        Long rideId = 1L;
        Long driverId = 20L;
        when(rideRepository.driverGetRide(rideId, driverId)).thenReturn(ride);

        Ride result = rideService.driverGetRide(rideId, driverId);

        assertNotNull(result);
        assertEquals(ride, result);
        verify(rideRepository, times(1)).driverGetRide(rideId, driverId);
    }

    @Test
    void changeStatus_ShouldReturnUpdatedRide_WhenRideExists() {
        long rideId = 1L;
        RideStatus newStatus = RideStatus.COMPLETED; // Assuming COMPLETED is a valid status.
        when(rideRepository.exists(rideId)).thenReturn(true);

        Ride updatedRide = new Ride();
        updatedRide.setStatus(newStatus);

        when(rideRepository.changeStatus(rideId, newStatus)).thenReturn(updatedRide);

        Ride result = rideService.changeStatus(rideId, newStatus);

        assertNotNull(result);
        assertEquals(newStatus, result.getStatus());
        verify(rideRepository, times(1)).changeStatus(rideId, newStatus);
    }

    @Test
    void changeStatus_ShouldThrowRideNotFoundException_WhenRideDoesNotExist() {
        Long rideId = 1L;
        RideStatus newStatus = RideStatus.COMPLETED;
        when(rideRepository.exists(rideId)).thenReturn(false);

        assertThrows(RideNotFoundException.class, () -> rideService.changeStatus(rideId, newStatus));
    }

    @Test
    void getMostActiveUser_ShouldReturnUserOptional() {
        User mostActiveUser = new User(
                1L,
                "JohnDoe",
                "john@example.com",
                "password123",
                "+359888555532",
                null,
                null,
                Role.USER,
                true
        );
        when(rideRepository.getMostActiveUser()).thenReturn(Optional.of(mostActiveUser));

        Optional<User> result = rideService.getMostActiveUser();

        assertTrue(result.isPresent());
        assertEquals(mostActiveUser, result.get());
        verify(rideRepository, times(1)).getMostActiveUser();
    }

    @Test
    void getMostActiveDriver_ShouldReturnDriverOptional() {
        Driver mostActiveDriver = new Driver(20L, 1L, "John", "Doe", "235623532", DriverStatus.AVAILABLE, RideOption.PREMIUM);
        when(rideRepository.getMostActiveDriver()).thenReturn(Optional.of(mostActiveDriver));

        Optional<Driver> result = rideService.getMostActiveDriver();

        assertTrue(result.isPresent());
        assertEquals(mostActiveDriver, result.get());
        verify(rideRepository, times(1)).getMostActiveDriver();
    }

    @Test
    void countRides_ShouldReturnCorrectCount() {
        when(rideRepository.countRides()).thenReturn(5L);

        long count = rideService.countRides();

        assertEquals(5L, count);
        verify(rideRepository, times(1)).countRides();
    }
}
