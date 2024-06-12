package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.entity.YachtService;

import java.util.List;

public interface IYachtService {
    boolean addYachtService(String yachtId, String service, long price);
    boolean deleteYachtService(String yachtId, String serviceId);
    boolean updateYachtService(String yachtId, String service, long price);
}