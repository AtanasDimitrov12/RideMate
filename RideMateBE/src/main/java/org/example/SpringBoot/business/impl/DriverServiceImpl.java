package org.example.SpringBoot.business.impl;

import lombok.RequiredArgsConstructor;
import org.example.SpringBoot.business.DriverService;
import org.example.SpringBoot.domain.Driver;
import org.example.SpringBoot.domain.DriverStatus;
import org.example.SpringBoot.exception_handling.DriverNotFoundException;
import org.example.SpringBoot.persistence.repositories.DriverRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DriverServiceImpl implements DriverService {
    
    private final DriverRepository driverRepository;

    @Override
    public List<Driver> getAllDrivers() {
        return driverRepository.getAll();
    }

    @Override
    public Driver getDriverById(Long id) {
        return driverRepository.getDriverByUserId(id)
                .orElseThrow(() -> new DriverNotFoundException(id));
    }


    @Override
    public Driver getDriverByUserId(Long userId) {
        return driverRepository.getDriverByUserId(userId)
                .orElseThrow(() -> new DriverNotFoundException(userId));
    }

    @Override
    public Driver createDriver(Driver Driver) {

        return driverRepository.create(Driver);
    }

    @Override
    public void deleteDriver(Long id) {
        if (!driverRepository.exists(id)) {
            throw new DriverNotFoundException(id);
        }
        driverRepository.delete(id);
    }

    @Override
    public Driver updateDriver(Driver Driver) {
        Driver existingDriver = driverRepository.getDriverById(Driver.getId())
                .orElseThrow(() -> new DriverNotFoundException("Driver with id " + Driver.getId() + " not found"));

        return driverRepository.update(existingDriver);
    }

    @Override
    public Driver changeStatus(Long userid) {

        Driver driver = driverRepository.getDriverByUserId(userid).orElseThrow(() -> new DriverNotFoundException(userid));
        if (driverRepository.exists(driver.getId())) {

            if (driver.getStatus()== DriverStatus.OFFLINE)
            {
                return driverRepository.changeStatus(userid, DriverStatus.AVAILABLE);
            }
            else if (driver.getStatus()== DriverStatus.ON_RIDE){
                return driverRepository.changeStatus(userid, driver.getStatus());
            }
            else{
                return driverRepository.changeStatus(userid, DriverStatus.OFFLINE);
            }
        } else {
            throw new DriverNotFoundException(userid);
        }

    }

    @Override
    public long countDrivers() {
        return driverRepository.countDrivers();
    }

}
