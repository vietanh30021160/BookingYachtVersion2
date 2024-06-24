package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.ServiceDTO;
import com.example.YachtBookingBackEnd.entity.YachtService;
import com.example.YachtBookingBackEnd.repository.ServiceRepository;
import com.example.YachtBookingBackEnd.repository.YachtRepository;
import com.example.YachtBookingBackEnd.repository.YachtServiceRepository;
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
    @Autowired
    YachtServiceRepository yachtServiceRepository;

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
    public List<ServiceDTO> getAllServiceByYacht(String yachtId) {
        List<ServiceDTO> serviceDTOList = new ArrayList<>();
        try{
            List<YachtService> yachtServiceList = yachtServiceRepository.findServicesByYachtId(yachtId);
            if(!yachtServiceList.isEmpty()){
                for(YachtService yachtService: yachtServiceList){
                    ServiceDTO serviceDTO = new ServiceDTO();
                    serviceDTO.setIdService(yachtService.getService().getIdService());
                    serviceDTO.setService(yachtService.getService().getService());
                    serviceDTO.setPrice(yachtService.getService().getPrice());
                    serviceDTOList.add(serviceDTO);
                }
            }
        }catch (Exception e){
            System.out.println("error in findServiceByYachtId "+e.getMessage());
        }
        return serviceDTOList;
    }

    @Override
    public List<ServiceDTO> getAddingService(String yachtId) {
        List<ServiceDTO> serviceDTOList = new ArrayList<>();
        try{
            List<YachtService> yachtServiceList = yachtServiceRepository.findServicesByYachtId(yachtId);
            if(!yachtServiceList.isEmpty()){
                for(YachtService yachtService: yachtServiceList){
                    if(yachtService.getService().getPrice() > 0){
                        ServiceDTO serviceDTO = new ServiceDTO();
                        serviceDTO.setIdService(yachtService.getService().getIdService());
                        serviceDTO.setService(yachtService.getService().getService());
                        serviceDTO.setPrice(yachtService.getService().getPrice());
                        serviceDTOList.add(serviceDTO);
                    }
                }
            }
        }catch (Exception e){
            System.out.println("error in findServiceByYachtId "+e.getMessage());
        }
        return serviceDTOList;
    }


}
