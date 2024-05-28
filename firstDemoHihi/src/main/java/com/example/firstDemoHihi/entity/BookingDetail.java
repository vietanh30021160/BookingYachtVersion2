package com.example.firstDemoHihi.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "booking_detail")
public class BookingDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_booking_detail", nullable = false, length = 255)
    private String idBookingDetail;

    @Column(name = "room_quantity", nullable = false)
    private int roomQuantity;

    @Column(name = "unit_price", nullable = false)
    private long unitPrice;

    @Lob
    @Column(name = "requirement")
    private String requirement;

    @ManyToOne()
    @JoinColumn(name = "id_booking", nullable = false)
    private Booking booking;

    @OneToMany(mappedBy = "bookingDetail")
    private Set<BookingDetailRoom> bookingDetailRoomSet;

}