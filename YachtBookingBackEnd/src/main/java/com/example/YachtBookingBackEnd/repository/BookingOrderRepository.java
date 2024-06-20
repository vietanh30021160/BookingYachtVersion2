package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.dto.BookingDTO;
import com.example.YachtBookingBackEnd.entity.BookingOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingOrderRepository extends JpaRepository<BookingOrder, String> {
    @Query("SELECT bo FROM BookingOrder bo WHERE bo.idBooking = :idBooking AND bo.customer.idCustomer = :idCustomer AND bo.status = 'completed'")
    Optional<BookingOrder> findByIdAndCustomerIdAndStatus(@Param("idBooking") String idBooking, @Param("idCustomer") String idCustomer);

    BookingOrder findByTxnRef(String txnRef);

    @Query("select new com.example.YachtBookingBackEnd.dto.BookingDTO(" +
            "bo.idBooking, c.idCustomer, c.fullName, bo.requirement, bo.bookingTime, " +
            "rt.type, rt.price, sv.service, sv.price, s.idSchedule, bo.amount, bo.status) " +
            "from BookingOrder bo " +
            "join bo.schedule s " +
            "join bo.customer c " +
            "join BookingRoom br on br.bookingOrder.idBooking = bo.idBooking " +
            "join Room r on r.idRoom = br.room.idRoom " +
            "join r.roomType rt " +
            "join BookingService bs on bo.idBooking = bs.bookingOrder.idBooking " +
            "join Service sv on sv.idService = bs.service.idService"
    )
    List<BookingDTO> findAllBookingYacht();


}
