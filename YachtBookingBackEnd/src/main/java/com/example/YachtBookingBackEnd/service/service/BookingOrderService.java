package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.BookingOrderDTO;
import com.example.YachtBookingBackEnd.entity.BookingOrder;
import com.example.YachtBookingBackEnd.mapper.BookingOrderMapper;
import com.example.YachtBookingBackEnd.repository.BookingOrderRepository;
import com.example.YachtBookingBackEnd.service.implement.IBookingOrder;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // Tạo constructor (final)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j // Để sử dụng logging từ thư viện Lombok
public class BookingOrderService implements IBookingOrder {
    BookingOrderRepository bookingOrderRepository;

    public static final String DEFAULT_STATUS = "Pending";

    @Override
    public List<BookingOrderDTO> getAllBookingsByCompanyId(String idCompany) {
        List<BookingOrder> bookingOrderList = bookingOrderRepository.findBookingOrdersByCompany(idCompany);
        return bookingOrderList.stream()
                .map(BookingOrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public boolean confirmBooking(String idBookingOrder) {
        Optional<BookingOrder> bookingOrder = bookingOrderRepository.findById(idBookingOrder);
        try {
            if (bookingOrder.isPresent() && bookingOrder.get().getStatus().equals(DEFAULT_STATUS)) {
                bookingOrder.get().setStatus("Confirmed");
                bookingOrderRepository.save(bookingOrder.get());
                return true;
            }
        } catch (Exception e) {
            log.error("Confirm Booking failed", e);
        }
        return false;
    }

    @Override
    @Transactional
    public boolean cancelBooking(String idBookingOrder) {
        Optional<BookingOrder> bookingOrder = bookingOrderRepository.findById(idBookingOrder);
        try {
            if (bookingOrder.isPresent() && bookingOrder.get().getStatus().equals(DEFAULT_STATUS)) {
                bookingOrder.get().setStatus("Cancelled");
                bookingOrderRepository.save(bookingOrder.get());
                return true;
            }
        } catch (Exception e) {
            log.error("Cancel Booking failed", e);
        }
        return false;
    }
}
