package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.entity.BookingService;
import com.example.YachtBookingBackEnd.service.implement.IBookingOrder;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor // Tạo constructor (final)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j // Để sử dụng logging từ thư viện Lombok
public class ScheduledTasks {
    IBookingOrder iBookingOrder;

    @Scheduled(fixedRate = 3600000)
    public void checkAndProcessBookings() {
        iBookingOrder.autoConfirmAndCancelBookings();
    }
}
