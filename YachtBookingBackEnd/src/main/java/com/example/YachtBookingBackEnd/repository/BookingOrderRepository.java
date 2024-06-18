package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.BookingOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingOrderRepository extends JpaRepository<BookingOrder, String> {
    BookingOrder findByTxnRef(String txnRef);

    @Query("SELECT b FROM BookingOrder b " +
            "JOIN b.schedule s " +
            "JOIN  s.yachtScheduleSet ys " +
            "JOIN  ys.yacht y " +
            "WHERE  y.company.idCompany = :idCompany")
    List<BookingOrder> findBookingOrdersByCompany(@Param("idCompany") String idCompany);
}
