package org.example.SpringBoot.persistence.jpa_repositories;

import org.example.SpringBoot.domain.RideStatus;
import org.example.SpringBoot.persistence.entity.DriverEntity;
import org.example.SpringBoot.persistence.entity.RideEntity;
import org.example.SpringBoot.persistence.entity.UserEntity;
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

    // New method: get the user entity with the most rides
    @Query("SELECT u FROM UserEntity u JOIN RideEntity r ON u.id = r.userId GROUP BY u.id ORDER BY COUNT(r.id) DESC")
    Optional<UserEntity> findMostActiveUser();

    // New method: get the driver entity with the most rides
    @Query("SELECT d FROM DriverEntity d JOIN RideEntity r ON d.id = r.driverId GROUP BY d.id ORDER BY COUNT(r.id) DESC")
    Optional<DriverEntity> findMostActiveDriver();


}
