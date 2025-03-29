package org.example.SpringBoot.persistence.repositories.impl;

import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.domain.DriverRequest;
import org.example.SpringBoot.persistence.entity.DriverRequestEntity;
import org.example.SpringBoot.persistence.jpa_repositories.JpaDriverRequestRepository;
import org.example.SpringBoot.persistence.mappers.DriverRequestEntityMapper;
import org.example.SpringBoot.persistence.repositories.DriverRequestRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class DriverRequestRepositoryImpl implements DriverRequestRepository {

    private final JpaDriverRequestRepository jpaDriverRequestRepository;
    private final DriverRequestEntityMapper driverRequestEntityMapper;

    @Override
    public boolean exists(long id){
        return jpaDriverRequestRepository.existsById(id);
    }


    @Override
    public List<DriverRequest> getAll(){
        return jpaDriverRequestRepository.findAll().stream()
                .map(driverRequestEntityMapper::toDomain)
                .toList();
    }


    @Override
    public DriverRequest create(DriverRequest driverRequest){
        DriverRequestEntity driverRequestEntity = driverRequestEntityMapper.toEntity(driverRequest);
        return driverRequestEntityMapper.toDomain(jpaDriverRequestRepository.save(driverRequestEntity));
    }

    @Override
    public DriverRequest update(DriverRequest driverRequest){
        DriverRequestEntity driverRequestEntity = driverRequestEntityMapper.toEntity(driverRequest);
        return driverRequestEntityMapper.toDomain(jpaDriverRequestRepository.save(driverRequestEntity));
    }

    @Override
    public void delete(long DriverRequestId){
        jpaDriverRequestRepository.deleteById(DriverRequestId);
    }

    @Override
    public Optional<DriverRequest> getDriverRequestByFirstName(String firstName){
        return jpaDriverRequestRepository.getDriverRequestEntityByFirstName(firstName).map(driverRequestEntityMapper::toDomain);
    }
}
