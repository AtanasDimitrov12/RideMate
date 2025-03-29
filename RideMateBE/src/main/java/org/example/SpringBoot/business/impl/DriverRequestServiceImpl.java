package org.example.SpringBoot.business.impl;

import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.business.DriverRequestService;
import org.example.SpringBoot.domain.DriverRequest;
import org.example.SpringBoot.persistence.repositories.DriverRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DriverRequestServiceImpl implements DriverRequestService {

    private final DriverRequestRepository driverRequestRepository;

    @Override
    public boolean exists(long id){
        return driverRequestRepository.exists(id);
    }

    @Override
    public List<DriverRequest> getAll(){
        return driverRequestRepository.getAll();
    }

    @Override
    public DriverRequest create(DriverRequest DriverRequest){
        return driverRequestRepository.create(DriverRequest);
    }


    @Override
    public DriverRequest update(DriverRequest DriverRequest){
        return driverRequestRepository.update(DriverRequest);
    }

    @Override
    public void delete(long DriverRequestId){
        driverRequestRepository.delete(DriverRequestId);
    }

    @Override
    public Optional<DriverRequest> getDriverRequestByFirstName(String firstName){
        return driverRequestRepository.getDriverRequestByFirstName(firstName);
    }
}
