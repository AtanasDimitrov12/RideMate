package org.example.SpringBoot.business.impl;

import org.example.SpringBoot.domain.DriverRequest;
import org.example.SpringBoot.persistence.repositories.DriverRequestRepository;
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
class DriverRequestServiceImplTest {

    @Mock
    private DriverRequestRepository driverRequestRepository;

    @InjectMocks
    private DriverRequestServiceImpl driverRequestService;

    private DriverRequest driverRequest;

    @BeforeEach
    void setUp() {
        // Create a sample DriverRequest instance.
        driverRequest = new DriverRequest(1L, 1L, "John", "Doe", "235623532", "BMW", "M5 2020", "A3711PA");
    }

    @Test
    void exists_ShouldReturnTrue_WhenDriverRequestExists() {
        when(driverRequestRepository.exists(1L)).thenReturn(true);

        boolean result = driverRequestService.exists(1L);

        assertTrue(result);
        verify(driverRequestRepository, times(1)).exists(1L);
    }

    @Test
    void exists_ShouldReturnFalse_WhenDriverRequestDoesNotExist() {
        when(driverRequestRepository.exists(1L)).thenReturn(false);

        boolean result = driverRequestService.exists(1L);

        assertFalse(result);
        verify(driverRequestRepository, times(1)).exists(1L);
    }

    @Test
    void getAll_ShouldReturnListOfDriverRequests() {
        List<DriverRequest> requests = List.of(driverRequest);
        when(driverRequestRepository.getAll()).thenReturn(requests);

        List<DriverRequest> result = driverRequestService.getAll();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(driverRequest, result.get(0));
        verify(driverRequestRepository, times(1)).getAll();
    }

    @Test
    void create_ShouldReturnCreatedDriverRequest() {
        when(driverRequestRepository.create(any(DriverRequest.class))).thenReturn(driverRequest);

        DriverRequest created = driverRequestService.create(driverRequest);

        assertNotNull(created);
        assertEquals(driverRequest, created);
        verify(driverRequestRepository, times(1)).create(driverRequest);
    }

    @Test
    void update_ShouldReturnUpdatedDriverRequest() {
        when(driverRequestRepository.update(any(DriverRequest.class))).thenReturn(driverRequest);

        DriverRequest updated = driverRequestService.update(driverRequest);

        assertNotNull(updated);
        assertEquals(driverRequest, updated);
        verify(driverRequestRepository, times(1)).update(driverRequest);
    }

    @Test
    void delete_ShouldCallRepositoryDelete() {
        // No return value expected, so simply verify delete is called.
        doNothing().when(driverRequestRepository).delete(1L);

        driverRequestService.delete(1L);

        verify(driverRequestRepository, times(1)).delete(1L);
    }

    @Test
    void getDriverRequestByFirstName_ShouldReturnDriverRequest_WhenExists() {
        when(driverRequestRepository.getDriverRequestByFirstName("John")).thenReturn(Optional.of(driverRequest));

        Optional<DriverRequest> result = driverRequestService.getDriverRequestByFirstName("John");

        assertTrue(result.isPresent());
        assertEquals(driverRequest, result.get());
        verify(driverRequestRepository, times(1)).getDriverRequestByFirstName("John");
    }

    @Test
    void getDriverRequestByFirstName_ShouldReturnEmpty_WhenNotExists() {
        when(driverRequestRepository.getDriverRequestByFirstName("John")).thenReturn(Optional.empty());

        Optional<DriverRequest> result = driverRequestService.getDriverRequestByFirstName("John");

        assertFalse(result.isPresent());
        verify(driverRequestRepository, times(1)).getDriverRequestByFirstName("John");
    }
}
