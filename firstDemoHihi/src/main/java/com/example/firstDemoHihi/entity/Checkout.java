package com.example.firstDemoHihi.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "checkout")
public class Checkout {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_checkout", nullable = false, length = 255)
    private String idCheckout;

    @Column(name = "status", nullable = false, length = 100)
    private String status;

    @OneToOne()
    @JoinColumn(name = "id_booking_detail", referencedColumnName = "id_booking_detail")
    private BookingDetail bookingDetail;

}