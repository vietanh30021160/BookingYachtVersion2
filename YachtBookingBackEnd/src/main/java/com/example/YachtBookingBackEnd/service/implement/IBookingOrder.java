package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.BookingDTO;
import com.example.YachtBookingBackEnd.dto.BookingOrderDTO;

import java.util.List;
import java.util.Set;

public interface IBookingOrder {
    List<BookingOrderDTO> getAllBookingsByCompanyId(String idCompany);

    List<BookingOrderDTO> getBookingOrderByPrice(String idCompany, Long min, Long max);

    boolean confirmBooking(String idBookingOrder, String idCompany);

    boolean cancelBooking(String idBookingOrder, String reason, String idCompany);

    void autoConfirmAndCancelBookings();
}
