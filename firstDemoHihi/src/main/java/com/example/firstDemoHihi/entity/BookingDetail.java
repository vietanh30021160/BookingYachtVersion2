package com.example.firstDemoHihi.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "booking_details")
public class BookingDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_booking_detail", nullable = false, length = 255)
    private String idBookingDetails;

    @Column(name = "total_price", nullable = false, precision = 10)
    private long totalPrice;

    @Column(name = "total_room", nullable = false)
    private int totalRoom;

    @Lob
    @Column(name = "requirement")
    private String requirement;

    @ManyToOne()
    @JoinColumn(name = "id_booking", nullable = false)
    private Booking booking;

    @OneToOne(mappedBy = "bookingDetail")
    private Checkout checkout;

}