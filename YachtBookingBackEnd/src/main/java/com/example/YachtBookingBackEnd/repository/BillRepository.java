package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillRepository extends JpaRepository<Bill, String> {
        boolean existsByBookingOrder_IdBooking(String idBooking);
}
