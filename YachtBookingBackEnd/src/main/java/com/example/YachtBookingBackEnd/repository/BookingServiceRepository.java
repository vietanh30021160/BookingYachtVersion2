package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.BookingService;
import com.example.YachtBookingBackEnd.entity.key.KeysBookingService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingServiceRepository extends JpaRepository<BookingService, KeysBookingService> {
}
