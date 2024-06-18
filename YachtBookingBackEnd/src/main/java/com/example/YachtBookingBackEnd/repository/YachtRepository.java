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
}
