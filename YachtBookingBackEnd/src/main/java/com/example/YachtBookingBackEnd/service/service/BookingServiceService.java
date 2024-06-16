package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.entity.BookingOrder;
import com.example.YachtBookingBackEnd.entity.BookingService;
import com.example.YachtBookingBackEnd.entity.Service;
import com.example.YachtBookingBackEnd.repository.BookingServiceRepository;
import com.example.YachtBookingBackEnd.service.implement.IBookingService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@org.springframework.stereotype.Service
@RequiredArgsConstructor // Tạo constructor (final)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j // Để sử dụng logging từ thư viện Lombok
public class BookingServiceService implements IBookingService {
    BookingServiceRepository bookingServiceRepository;

    @Override
    public Set<BookingService> createBookingServices(List<Service> selectedServices, BookingOrder bookingOrder) {
        Set<BookingService> bookingServiceSet = new HashSet<>();
        for (Service service : selectedServices) {
            BookingService bookingService = new BookingService();
            bookingService.setBookingOrder(bookingOrder);
            bookingService.setService(service);

            bookingServiceSet.add(bookingService);
        }
        return bookingServiceSet;
    }

    @Override
    public void addBookingService(BookingOrder bookingOrder, Service service) {
        BookingService bookingService = new BookingService();
        bookingService.setBookingOrder(bookingOrder);
        bookingService.setService(service);

        if (bookingOrder.getBookingServiceSet() == null) {
            bookingOrder.setBookingServiceSet(new HashSet<>());
        }
        bookingOrder.getBookingServiceSet().add(bookingService);

        bookingServiceRepository.save(bookingService);
        log.info("Added service {} to booking order {}", service.getIdService(), bookingOrder.getIdBooking());
    }

    @Override
    public void removeBookingService(BookingService bookingService) {
        BookingOrder bookingOrder = bookingService.getBookingOrder();
        bookingOrder.getBookingServiceSet().remove(bookingService);
        bookingServiceRepository.delete(bookingService);
        log.info("Removed service {} from booking order {}", bookingService.getService().getIdService(), bookingOrder.getIdBooking());
    }
}
