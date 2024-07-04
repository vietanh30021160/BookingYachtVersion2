package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Yacht;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface YachtRepository extends JpaRepository<Yacht, String> {
    @Query("SELECT y FROM Yacht y WHERE y.company.idCompany = :companyId")
    List<Yacht> findAllByCompanyId(@Param("companyId") String companyId);


    @Query(value = "SELECT y.* FROM yacht y JOIN yacht_schedule ys ON y.id_yacht = ys.id_yacht JOIN schedule s ON ys.id_schedule = s.id_schedule JOIN booking_order bo ON bo.id_schedule = s.id_schedule JOIN bill b ON b.id_booking = bo.id_booking WHERE bo.id_customer = :idCustomer AND bo.id_booking = :idBooking", nativeQuery = true)
    List<Yacht> findYachtsByCustomerAndBooking(@Param("idCustomer") String idCustomer, @Param("idBooking") String idBooking);

}
