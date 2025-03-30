package org.example.SpringBoot.business;

import org.example.SpringBoot.domain.Admin;

import java.util.List;
import java.util.Optional;

public interface AdminService {
    List<Admin> getAllAdmins();
    Admin getAdminById(Long id);
    Admin getAdminByUserId(Long userId);
    Admin createAdmin(Admin admin);
    void deleteAdmin(Long id);
    Admin updateAdmin(Admin admin);
    Admin updateDepartment(Admin admin, String department);
}
