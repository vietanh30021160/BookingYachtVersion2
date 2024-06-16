package com.example.YachtBookingBackEnd.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "wallet")
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_wallet", nullable = false)
    private String idWallet;

    @Column(name = "name")
    private String name;

    @Column(name = "bank_number", length = 20)
    private String bankNumber;

    @Column(name = "balance")
    private long balance;

//    @OneToMany(mappedBy = "wallet")
//    private Set<Transaction> transactionSet;

//    @OneToOne(mappedBy = "wallet")
//    private Customer customer;
}