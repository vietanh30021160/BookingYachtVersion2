package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.BookingDTO;
import com.example.YachtBookingBackEnd.dto.BookingOrderDTO;

import java.util.List;
import java.util.Set;

public interface IBookingOrder {
    List<BookingOrderDTO> getAllBookingsByCompanyId(String idCompany);

    boolean confirmBooking(String idBookingOrder);

    boolean cancelBooking(String idBookingOrder);

    List<BookingOrderDTO> getBookingOrderByPrice(String idCompany, Long min, Long max);
}
