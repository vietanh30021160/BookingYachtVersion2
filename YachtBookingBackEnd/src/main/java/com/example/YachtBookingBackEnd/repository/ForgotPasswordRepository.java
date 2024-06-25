package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.ForgotPassword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword, Integer> {

}
