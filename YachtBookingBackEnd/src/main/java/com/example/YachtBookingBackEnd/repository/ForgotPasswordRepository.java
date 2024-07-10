package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.ForgotPassword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword, Integer> {

    @Query("SELECT f FROM ForgotPassword f " +
            "JOIN f.account a " +
            "JOIN a.customer c " +
            "WHERE f.otp = :otp AND c.email = :email")
    ForgotPassword findByOtpAndEmail(@Param("otp") Integer otp, @Param("email") String email);
    @Query("SELECT f FROM ForgotPassword f " +
            "join f.account a " +
            "JOIN a.customer c " +
            "where c.email=:email")
    ForgotPassword findByEmail(@Param("email") String email);
}
