package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.ServiceDTO;

import java.util.List;

public interface IService {
    List<ServiceDTO> getAllService();
    boolean addService(String serviceName, double price);
}
