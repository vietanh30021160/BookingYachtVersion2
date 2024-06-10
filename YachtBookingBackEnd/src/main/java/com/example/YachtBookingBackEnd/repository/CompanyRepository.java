package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, String> {
    @Query("SELECT c FROM Company c WHERE c.name LIKE %:name% AND c.exist = 1")
    List<Company> findCompaniesByNameContaining(@Param("name") String name);

    @Query("SELECT c FROM Company c WHERE c.account.idAccount = :idAccount AND c.exist = 1")
    Optional<Company> findByIdAccountAndExist(@Param("idAccount") String idAccount);

    @Query("SELECT c FROM Company c WHERE c.idCompany = :idCompany AND c.exist = 1")
    Optional<Company> findByIdAndExist(@Param("idCompany") String idCompany);

    boolean existsCompanyByName(String name);
}
