package com.example.YachtBookingBackEnd.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

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
    private long amount;

    @Column(name = "transaction_date")
    private LocalDateTime transactionDate;

    @Column(name = "status")
    private String status; // Pending, Success, Failure

    @Column(name = "receiver_bank_tran_no")
    private String receiverBankTranNo;

    @Column(name = "sender_bank_tran_no")
    private String senderBankTranNo;

    @OneToOne()
    @JoinColumn(name = "id_booking", nullable = false, referencedColumnName = "id_booking")
    private BookingOrder bookingOrder;

    @OneToOne(mappedBy = "transaction")
    private Bill bill;
}