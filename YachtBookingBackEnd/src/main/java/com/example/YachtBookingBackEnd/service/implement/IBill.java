package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.BillDTO;

import java.util.List;

public interface IBill {
    List<BillDTO> getAllBillsByCustomer(String idCustomer);
}
