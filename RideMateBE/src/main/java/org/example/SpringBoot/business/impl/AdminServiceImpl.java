package org.example.SpringBoot.business.impl;

import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.business.AdminService;
import org.example.SpringBoot.domain.Admin;
import org.example.SpringBoot.exception_handling.AdminNotFoundException;
import org.example.SpringBoot.persistence.repositories.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.getAll();
    }

    @Override
    public Admin getAdminById(Long id) {
        return adminRepository.getAdminById(id)
                .orElseThrow(() -> new AdminNotFoundException(id));
    }

    @Override
    public Admin createAdmin(Admin admin) {

        return adminRepository.create(admin);
    }

    @Override
    public void deleteAdmin(Long id) {
        if (!adminRepository.exists(id)) {
            throw new AdminNotFoundException(id);
        }
        adminRepository.delete(id);
    }

    @Override
    public Admin updateAdmin(Admin admin) {
        Admin existingAdmin = adminRepository.getAdminById(admin.getId())
                .orElseThrow(() -> new AdminNotFoundException("Admin with id " + admin.getId() + " not found"));

        return adminRepository.update(existingAdmin);
    }
}