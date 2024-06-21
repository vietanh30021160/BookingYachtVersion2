package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.BookingOrder;
import com.example.YachtBookingBackEnd.entity.Room;
import com.example.YachtBookingBackEnd.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface BookingOrderRepository extends JpaRepository<BookingOrder, String> {
    Optional<BookingOrder> findByTxnRef(String txnRef);

    @Query("SELECT b FROM BookingOrder b " +
            "JOIN FETCH b.bookingRoomSet br " +
            "JOIN FETCH  br.room r " +
            "JOIN FETCH  r.yacht y " +
            "WHERE  y.company.idCompany = :idCompany")
    List<BookingOrder> findBookingOrdersByCompany(@Param("idCompany") String idCompany);

    @Query("SELECT COUNT(b) > 0 " +
            "FROM  BookingOrder b " +
            "JOIN b.bookingRoomSet br " +
            "WHERE br.room = :room AND  b.schedule = :schedule")
    boolean existsByRoomAndSchedule(@Param("room") Room room, @Param("schedule") Schedule schedule);

    @Query("SELECT bo FROM BookingOrder bo WHERE bo.idBooking = :idBooking AND bo.customer.idCustomer = :idCustomer AND bo.status = 'completed'")
    Optional<BookingOrder> findByIdAndCustomerIdAndStatus(@Param("idBooking") String idBooking, @Param("idCustomer") String idCustomer);
}
