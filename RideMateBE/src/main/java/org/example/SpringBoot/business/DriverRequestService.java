package org.example.SpringBoot.business;

import org.example.SpringBoot.domain.DriverRequest;

import java.util.List;
import java.util.Optional;

public interface DriverRequestService {
    boolean exists(long id);
    List<DriverRequest> getAll();

    DriverRequest create(DriverRequest DriverRequest);

    DriverRequest update(DriverRequest DriverRequest);

    void delete(long DriverRequestId);
    Optional<DriverRequest> getDriverRequestByFirstName(String firstName);
}
