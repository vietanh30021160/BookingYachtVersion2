package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.entity.BookingOrder;
import com.example.YachtBookingBackEnd.entity.BookingService;
import com.example.YachtBookingBackEnd.entity.Service;

import java.util.List;
import java.util.Set;

public interface IBookingService {
    Set<BookingService> createBookingServices(List<Service> selectedServices, BookingOrder bookingOrder);

    void addBookingService(BookingOrder bookingOrder, Service service);

    void removeBookingService(BookingService bookingService);
}
