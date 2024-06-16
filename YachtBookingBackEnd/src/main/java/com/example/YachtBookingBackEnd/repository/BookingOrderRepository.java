package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.BookingOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingOrderRepository extends JpaRepository<BookingOrder, String> {
    BookingOrder findByTxnRef(String txnRef);
}
