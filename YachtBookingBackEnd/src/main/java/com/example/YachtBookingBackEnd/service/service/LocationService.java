package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.LocationDTO;
import com.example.YachtBookingBackEnd.entity.Location;
import com.example.YachtBookingBackEnd.repository.LocationRepository;
import com.example.YachtBookingBackEnd.service.implement.ILocation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class LocationService implements ILocation {
    @Autowired
    LocationRepository locationRepository;


    @Override
    public List<LocationDTO> getAllLocation() {
        List<LocationDTO> listLocationDTO = new ArrayList<>();
        try{
            List<Location> locationList = locationRepository.findAll();
            System.out.println(locationList);
            for (Location location : locationList) {
                LocationDTO locationDTO = new LocationDTO();
                locationDTO.setIdLocation(location.getIdLocation());
                locationDTO.setName(location.getName());
                listLocationDTO.add(locationDTO);
            }

        }catch (Exception e){
            System.out.println("Error LocationDTO " + e.getMessage());
        }
        return listLocationDTO;
    }
}
