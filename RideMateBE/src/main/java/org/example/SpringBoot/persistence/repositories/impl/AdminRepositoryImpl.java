package org.example.SpringBoot.persistence.repositories.impl;

import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.domain.Admin;
import org.example.SpringBoot.domain.Driver;
import org.example.SpringBoot.persistence.entity.AdminEntity;
import org.example.SpringBoot.persistence.jpa_repositories.JpaAdminRepository;
import org.example.SpringBoot.persistence.mappers.AdminEntityMapper;
import org.example.SpringBoot.persistence.repositories.AdminRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class AdminRepositoryImpl implements AdminRepository {

    private final JpaAdminRepository jpaAdminRepository;
    private final AdminEntityMapper adminEntityMapper;

    @Override
    public boolean exists(long id) {
        return jpaAdminRepository.existsById(id);
    }

    @Override
    public List<Admin> getAll() {
        return jpaAdminRepository.findAll().stream()
                .map(adminEntityMapper::toDomain)
                .toList();
    }

    @Override
    public Optional<Admin> getAdminByUserId(long userId) {
        return jpaAdminRepository.getAdminByUserId(userId)
                .map(adminEntityMapper::toDomain);
    }

    @Override
    public Admin create(Admin trainer) {
        AdminEntity adminEntity = adminEntityMapper.toEntity(trainer);
        AdminEntity savedEntity = jpaAdminRepository.save(adminEntity);
        return adminEntityMapper.toDomain(savedEntity);
    }

    @Override
    public Admin update(Admin trainer) {
        AdminEntity adminEntity = adminEntityMapper.toEntity(trainer);
        AdminEntity updatedEntity = jpaAdminRepository.save(adminEntity);
        return adminEntityMapper.toDomain(updatedEntity);
    }

    @Override
    public void delete(long trainerId) {
        jpaAdminRepository.deleteById(trainerId);
    }



    @Override
    public Optional<Admin> getAdminById(long adminId) {
        return jpaAdminRepository.findById(adminId)
                .map(adminEntityMapper::toDomain);
    }

    @Override
    public Optional<Admin> findByDepartment(String department){
        return jpaAdminRepository.findByDepartment(department)
                .map(adminEntityMapper::toDomain);
    }
}
