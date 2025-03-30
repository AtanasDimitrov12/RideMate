package org.example.SpringBoot.controllers;

import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.business.AdminService;
import org.example.SpringBoot.controllers.dto.AdminDTO;
import org.example.SpringBoot.controllers.mapper.AdminMapper;
import org.example.SpringBoot.domain.Admin;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admins")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final AdminMapper adminMapper;

    // Get a list of all admins - accessible only to ADMIN users
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<AdminDTO> getAllAdmins() {
        return adminService.getAllAdmins().stream()
                .map(adminMapper::toDto)
                .toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public AdminDTO getAdminById(@PathVariable Long id) {
        Admin admin = adminService.getAdminById(id);
        return adminMapper.toDto(admin);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/department/{userId}")
    public String getAdminDepartmentByUserId(@PathVariable Long userId) {
        Admin admin = adminService.getAdminByUserId(userId);
        return admin.getDepartment();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public AdminDTO createAdmin(@RequestBody AdminDTO adminDTO) {
        Admin admin = adminService.createAdmin(adminMapper.toDomain(adminDTO));
        return adminMapper.toDto(admin);
    }

    // Update an existing admin - accessible only to ADMIN users
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public AdminDTO updateAdmin(@RequestBody AdminDTO adminDTO) {
        Admin admin = adminMapper.toDomain(adminDTO);
        Admin updatedAdmin = adminService.updateAdmin(admin);
        return adminMapper.toDto(updatedAdmin);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{department}/{userId}")
    public AdminDTO updateAdmin(@PathVariable String department, @PathVariable Long userId) {
        Admin admin = adminService.getAdminByUserId(userId);
        Admin updatedAdmin = adminService.updateDepartment(admin, department);
        return adminMapper.toDto(updatedAdmin);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.noContent().build();
    }



}
