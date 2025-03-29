package org.example.SpringBoot.persistence.jpa_repositories;

import org.example.SpringBoot.domain.DriverRequest;
import org.example.SpringBoot.persistence.entity.DriverRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaDriverRequestRepository extends JpaRepository<DriverRequestEntity, Long> {
    Optional<DriverRequestEntity> getDriverRequestEntityByFirstName(String firstName);
}
