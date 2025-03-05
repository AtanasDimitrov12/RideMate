package org.example.SpringBoot.business;

import org.example.SpringBoot.domain.Admin;

import java.util.List;
import java.util.Optional;

public interface AdminService {
    List<Admin> getAllAdmins();
    Admin getAdminById(Long id);
    Admin createAdmin(Admin trainer);
    void deleteAdmin(Long id);
    Admin updateAdmin(Admin trainer);
}
