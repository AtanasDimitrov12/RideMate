package org.example.SpringBoot.persistence.jpa_repositories;

import org.example.SpringBoot.persistence.entity.RideEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JpaRideRepository extends JpaRepository<RideEntity, Long> {

    Optional<RideEntity> getRideEntityByUserId(Long id);

    List<RideEntity> getRidesByUserId(Long id);

    Optional<RideEntity> findFirstByUserIdAndStatusIn(Long userId, List<String> statuses);


}
