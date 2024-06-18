package com.example.YachtBookingBackEnd.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "transaction")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_transaction", nullable = false)
    private String idTransaction;

    @Column(name = "amount")
    private double amount;

    @Column(name = "transaction_date")
    private LocalDateTime transactionDate;

    @Column(name = "status")
    private String status;

    @Column(name = "id_receiver")
    private String idReceiver;

    @ManyToOne()
    @JoinColumn(name = "id_wallet", nullable = false)
    private Wallet wallet;

    @OneToOne()
    @JoinColumn(name = "id_booking", nullable = false, referencedColumnName = "id_booking")
    private BookingOrder bookingOrder;

    @OneToOne(mappedBy = "transaction")
    private Bill bill;
}