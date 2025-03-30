package org.example.SpringBoot.business.impl;

import org.example.SpringBoot.domain.Admin;
import org.example.SpringBoot.exception_handling.AdminNotFoundException;
import org.example.SpringBoot.persistence.repositories.AdminRepository;
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
class AdminServiceImplTest {

    @Mock
    private AdminRepository adminRepository;

    @InjectMocks
    private AdminServiceImpl adminService;

    private Admin admin;

    @BeforeEach
    void setUp() {
        // Construct a sample admin.
        // Adjust the fields based on your Admin entity's constructor and setters.
        admin = new Admin(1L,1L,"It-department");
    }

    @Test
    void getAllAdmins_ShouldReturnListOfAdmins() {
        when(adminRepository.getAll()).thenReturn(List.of(admin));

        List<Admin> admins = adminService.getAllAdmins();

        assertNotNull(admins);
        assertEquals(1, admins.size());
        assertEquals(admin, admins.get(0));
        verify(adminRepository, times(1)).getAll();
    }

    @Test
    void getAdminById_ShouldReturnAdmin_WhenExists() {
        when(adminRepository.getAdminById(1L)).thenReturn(Optional.of(admin));

        Admin result = adminService.getAdminById(1L);

        assertNotNull(result);
        assertEquals(admin, result);
        verify(adminRepository, times(1)).getAdminById(1L);
    }

    @Test
    void getAdminById_ShouldThrowAdminNotFoundException_WhenNotExists() {
        when(adminRepository.getAdminById(1L)).thenReturn(Optional.empty());

        AdminNotFoundException exception = assertThrows(AdminNotFoundException.class,
                () -> adminService.getAdminById(1L));
        // Optionally, check exception message
        // assertEquals("Admin not found with ID: 1", exception.getMessage());
    }

    @Test
    void getAdminByUserId_ShouldReturnAdmin_WhenExists() {
        when(adminRepository.getAdminByUserId(10L)).thenReturn(Optional.of(admin));

        Admin result = adminService.getAdminByUserId(10L);

        assertNotNull(result);
        assertEquals(admin, result);
        verify(adminRepository, times(1)).getAdminByUserId(10L);
    }

    @Test
    void getAdminByUserId_ShouldThrowAdminNotFoundException_WhenNotExists() {
        when(adminRepository.getAdminByUserId(10L)).thenReturn(Optional.empty());

        assertThrows(AdminNotFoundException.class, () -> adminService.getAdminByUserId(10L));
    }

    @Test
    void createAdmin_ShouldReturnCreatedAdmin() {
        when(adminRepository.create(admin)).thenReturn(admin);

        Admin createdAdmin = adminService.createAdmin(admin);

        assertNotNull(createdAdmin);
        assertEquals(admin, createdAdmin);
        verify(adminRepository, times(1)).create(admin);
    }

    @Test
    void deleteAdmin_ShouldDeleteAdmin_WhenExists() {
        when(adminRepository.exists(1L)).thenReturn(true);

        adminService.deleteAdmin(1L);

        verify(adminRepository, times(1)).delete(1L);
    }

    @Test
    void deleteAdmin_ShouldThrowAdminNotFoundException_WhenNotExists() {
        when(adminRepository.exists(1L)).thenReturn(false);

        assertThrows(AdminNotFoundException.class, () -> adminService.deleteAdmin(1L));
    }

    @Test
    void updateAdmin_ShouldUpdateAndReturnAdmin_WhenAdminExists() {
        when(adminRepository.getAdminById(admin.getId())).thenReturn(Optional.of(admin));
        when(adminRepository.update(admin)).thenReturn(admin);

        Admin updatedAdmin = adminService.updateAdmin(admin);

        assertNotNull(updatedAdmin);
        assertEquals(admin, updatedAdmin);
        verify(adminRepository, times(1)).getAdminById(admin.getId());
        verify(adminRepository, times(1)).update(admin);
    }

    @Test
    void updateAdmin_ShouldThrowAdminNotFoundException_WhenAdminNotExists() {
        when(adminRepository.getAdminById(admin.getId())).thenReturn(Optional.empty());

        assertThrows(AdminNotFoundException.class, () -> adminService.updateAdmin(admin));
    }

    @Test
    void updateDepartment_ShouldUpdateDepartmentAndReturnAdmin() {
        String newDepartment = "HR Department";
        // Update the department on the admin instance.
        admin.setDepartment(newDepartment);
        when(adminRepository.update(admin)).thenReturn(admin);

        Admin result = adminService.updateDepartment(admin, newDepartment);

        assertNotNull(result);
        assertEquals(newDepartment, result.getDepartment());
        verify(adminRepository, times(1)).update(admin);
    }
}
