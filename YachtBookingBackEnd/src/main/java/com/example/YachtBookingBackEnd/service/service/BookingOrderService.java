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

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // Tạo constructor (final)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j // Để sử dụng logging từ thư viện Lombok
public class BookingOrderService implements IBookingOrder {
    BookingOrderRepository bookingOrderRepository;

    public static final String DEFAULT_STATUS = "Pending";

    @Override
    // Sử dụng @Transactional để giữ phiên Hibernate mở trong suốt quá trình xử lý
    @Transactional(readOnly = true)
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
        Optional<BookingOrder> bookingOrderOptional = bookingOrderRepository.findById(idBookingOrder);

        if (bookingOrderOptional.isPresent()) {
            BookingOrder bookingOrder = bookingOrderOptional.get();
            LocalDateTime bookingTime = bookingOrder.getBookingTime();
            LocalDateTime now = LocalDateTime.now();
            boolean isOverdue = now.isAfter(bookingTime.plusHours(24));
            boolean isPending = DEFAULT_STATUS.equals(bookingOrder.getStatus());
            boolean isTransactionFailed = bookingOrder.getTransaction() != null
                    && "Failure".equals(bookingOrder.getTransaction().getStatus());

            if (isPending && (isOverdue || isTransactionFailed)) {
                try {
                    bookingOrder.setStatus("Cancelled");
                    bookingOrderRepository.save(bookingOrder);
                    return true;
                } catch (Exception e) {
                    log.error("Cancel Booking failed", e);
                }
            }
        }

        return false;
    }

    @Override
    @Transactional
    public List<BookingOrderDTO> getBookingOrderByPrice(String idCompany, Long min, Long max) {
        List<BookingOrder> bookingOrderList = bookingOrderRepository.findPriceByRange(idCompany, min, max);
        return bookingOrderList.stream()
                .map(BookingOrderMapper::toDTO)
                .collect(Collectors.toList());
    }


}
