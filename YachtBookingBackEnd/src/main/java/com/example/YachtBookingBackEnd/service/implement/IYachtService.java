package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.YachtServiceDTO;
import com.example.YachtBookingBackEnd.entity.YachtService;

import java.util.List;

public interface IYachtService {
    List<YachtServiceDTO> getAllYachtService();
    boolean addYachtService(String yachtId, String service, long price);
    boolean deleteYachtService(String yachtId, String serviceId);
    boolean updateYachtService(String yachtId, String serviceId, String service, long price);

}