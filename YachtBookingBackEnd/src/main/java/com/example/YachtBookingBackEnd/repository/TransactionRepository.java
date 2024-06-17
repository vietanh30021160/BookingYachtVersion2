package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
}
