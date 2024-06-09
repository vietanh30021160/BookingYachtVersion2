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
@Table(name = "bill")
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_bill", nullable = false)
    private String idBill;

    @OneToOne()
    @JoinColumn(name = "id_transaction", nullable = false, referencedColumnName = "id_transaction")
    private Transaction transaction;

    @OneToOne()
    @JoinColumn(name = "id_booking", nullable = false, referencedColumnName = "id_booking")
    private BookingOrder bookingOrder;
}