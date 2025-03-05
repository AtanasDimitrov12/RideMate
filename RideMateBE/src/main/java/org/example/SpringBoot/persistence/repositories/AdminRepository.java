package org.example.SpringBoot.persistence.repositories;

import org.example.SpringBoot.domain.Admin;

import java.util.List;
import java.util.Optional;

public interface AdminRepository {

    boolean exists(long id);

    List<Admin> getAll();

    Admin create(Admin admin);

    Admin update(Admin admin);

    void delete(long adminId);

    Optional<Admin> getAdminById(long adminId);

    Optional<Admin> findByDepartment(String department);

}
