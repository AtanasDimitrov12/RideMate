package org.example.SpringBoot.persistence.repositories;

import org.example.SpringBoot.domain.DriverRequest;

import java.util.List;
import java.util.Optional;

public interface DriverRequestRepository {
    boolean exists(long id);
    List<DriverRequest> getAll();

    DriverRequest create(DriverRequest DriverRequest);

    DriverRequest update(DriverRequest DriverRequest);

    void delete(long DriverRequestId);
    Optional<DriverRequest> getDriverRequestByFirstName(String firstName);
}
