package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.BookingOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BookingOrderRepository extends JpaRepository<BookingOrder, String> {
    @Query("SELECT bo FROM BookingOrder bo WHERE bo.idBooking = :idBooking AND bo.customer.idCustomer = :idCustomer AND bo.status = 'completed'")
    Optional<BookingOrder> findByIdAndCustomerIdAndStatus(@Param("idBooking") String idBooking, @Param("idCustomer") String idCustomer);
}
