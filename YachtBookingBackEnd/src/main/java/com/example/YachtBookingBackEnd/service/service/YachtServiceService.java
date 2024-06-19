package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.ServiceDTO;
import com.example.YachtBookingBackEnd.entity.Yacht;
import com.example.YachtBookingBackEnd.entity.YachtService;
import com.example.YachtBookingBackEnd.entity.key.KeysYachtService;
import com.example.YachtBookingBackEnd.repository.ServiceRepository;
import com.example.YachtBookingBackEnd.repository.YachtRepository;
import com.example.YachtBookingBackEnd.repository.YachtServiceRepository;
import com.example.YachtBookingBackEnd.service.implement.IYachtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class YachtServiceService implements IYachtService {
    @Autowired
    YachtServiceRepository yachtServiceRepository;
    @Autowired
    YachtRepository yachtRepository;
    @Autowired
    ServiceRepository serviceRepository;

    @Override
    public boolean addYachtService(String yachtId, String service, long price) {
        try{
            Optional<Yacht> yacht = yachtRepository.findById(yachtId);
            if(yacht.isPresent()) {
//                com.example.YachtBookingBackEnd.entity.Service isService = serviceRepository.findService(service);
                com.example.YachtBookingBackEnd.entity.Service isService = serviceRepository.findByService(service);
                if(isService == null) {
                    isService = new com.example.YachtBookingBackEnd.entity.Service();
                    isService.setService(service);
                    isService.setPrice(price);
                    serviceRepository.save(isService);
                }
                YachtService yachtService = new YachtService();
                yachtService.setService(isService);
                yachtService.setYacht(yachtService.getYacht());

                KeysYachtService key = new KeysYachtService(yachtId, isService.getIdService());
                yachtService.setKeys(key);

                yachtServiceRepository.save(yachtService);

                return true;
            }
        }catch (Exception e){
            System.out.println("error in addYachtService " + e.getMessage());
        }
        return false;
    }

    @Override
    public boolean deleteYachtService(String yachtId, String serviceId) {
        try{
            KeysYachtService key = new KeysYachtService(yachtId, serviceId);
            Optional<YachtService> yachtService = yachtServiceRepository.findByKeys(key);
            if(yachtService.isPresent()) {
                System.out.println("tim tahy");
                yachtServiceRepository.delete(yachtService.get());
                return true;
            }
        }catch (Exception e){
            System.out.println("error in deleteYachtService " + e.getMessage());
        }
        return false;
    }

    @Override
    public boolean updateYachtService(String yachtId, String serviceId, String service, long price) {
        try{
            KeysYachtService key = new KeysYachtService(yachtId, serviceId);
            Optional<YachtService> yachtService = yachtServiceRepository.findByKeys(key);
            if(yachtService.isPresent()) {
                //lay ra doi tuong Service
                com.example.YachtBookingBackEnd.entity.Service serviceObject = yachtService.get().getService();

                // Check if another service with the same name exists
                com.example.YachtBookingBackEnd.entity.Service existingService = serviceRepository.findByService(service);

                //co ton tai mot service giong nhau
                if(existingService != null && !existingService.getIdService().equals(serviceId)) {
                    return false;
                } else {
                    serviceObject.setService(service);
                    serviceObject.setPrice(price);
                    serviceRepository.save(serviceObject);
                    return true;
                }
            }
        }catch (Exception e){
            System.out.println("error in updateYachtService " + e.getMessage());
        }
        return false;
    }
}
