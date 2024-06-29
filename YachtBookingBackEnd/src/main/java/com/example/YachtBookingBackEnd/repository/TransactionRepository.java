package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.BookingOrder;
import com.example.YachtBookingBackEnd.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
    @Query("SELECT t " +
            "FROM Transaction t " +
            "WHERE t.bookingOrder = :bookingOrder")
    Transaction getTransactionByBooking(@Param("bookingOrder")BookingOrder bookingOrder);

    @Query("SELECT t FROM Transaction t WHERE t.idTransaction = :id")
    Optional<Transaction> findById(@Param("id") String id);
}
