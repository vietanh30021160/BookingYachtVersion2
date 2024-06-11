package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.ServiceDTO;
import com.example.YachtBookingBackEnd.repository.ServiceRepository;
import com.example.YachtBookingBackEnd.repository.YachtRepository;
import com.example.YachtBookingBackEnd.service.implement.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceService implements IService {
    @Autowired
    ServiceRepository serviceRepository;
    @Autowired
    YachtRepository yachtRepository;

    @Override
    public List<ServiceDTO> getAllService() {
        List<ServiceDTO> serviceDTOList = new ArrayList<>();
        try{
            List<com.example.YachtBookingBackEnd.entity.Service> serviceList = serviceRepository.findAll();
            if(!serviceList.isEmpty()){
                for(com.example.YachtBookingBackEnd.entity.Service service: serviceList){
                    ServiceDTO serviceDTO = new ServiceDTO();
                    serviceDTO.setIdService(service.getIdService());
                    serviceDTO.setService(service.getService());
                    serviceDTO.setPrice(service.getPrice());
                    serviceDTOList.add(serviceDTO);
                }
            }
        }catch (Exception e){
            System.out.println("error get all service "+e.getMessage());
        }
        return serviceDTOList;
    }

    @Override
    public boolean addService(String serviceName, double price) {
        try{
            com.example.YachtBookingBackEnd.entity.Service service = new com.example.YachtBookingBackEnd.entity.Service();
            service.setService(serviceName);
            service.setPrice(service.getPrice());
            serviceRepository.save(service);
            return true;
        }catch (Exception e){
            System.out.println("error add service "+e.getMessage());
        }
        return false;
    }

}
