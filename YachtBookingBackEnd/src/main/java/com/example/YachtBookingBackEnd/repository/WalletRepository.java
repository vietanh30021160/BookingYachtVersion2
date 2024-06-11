package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletRepository extends JpaRepository<Wallet, String> {
    
}
