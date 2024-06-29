package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, String> {
        boolean existsByBookingOrder_IdBooking(String idBooking);

        @Query("SELECT b FROM Bill b " +
                "JOIN b.bookingOrder bo " +
                "JOIN b.transaction t " +
                "WHERE bo.customer.idCustomer = :idCustomer")
        List<Bill> findByIDCustomer(@Param("idCustomer") String idCustomer);
}
