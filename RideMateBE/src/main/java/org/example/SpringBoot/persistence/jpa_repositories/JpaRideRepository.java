package org.example.SpringBoot.persistence.jpa_repositories;

import org.example.SpringBoot.domain.RideStatus;
import org.example.SpringBoot.persistence.entity.RideEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JpaRideRepository extends JpaRepository<RideEntity, Long> {

    Optional<RideEntity> getRideEntityByUserId(Long id);

    List<RideEntity> getRidesByUserId(Long id);

    Optional<RideEntity> findFirstByUserIdAndStatusIn(Long userId, List<String> statuses);

    Optional<RideEntity> findFirstByDriverIdAndStatus(Long driverId, RideStatus status);



    @Query("SELECT r FROM RideEntity r WHERE r.status = :status")
    List<RideEntity> findRidesByStatus(@Param("status") RideStatus status);


}
