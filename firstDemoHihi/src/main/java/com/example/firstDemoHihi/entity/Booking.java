package com.example.firstDemoHihi.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_booking", nullable = false, length = 255)
    private String idBooking;

    @Column(name = "booking_time", nullable = false)
    private LocalDateTime bookingTime;

    @Column(name = "total_price", nullable = false)
    private long totalPrice;

    @ManyToOne()
    @JoinColumn(name = "id_yacht", nullable = false)
    private Yacht yacht;

    @Column(name = "status", nullable = false)
    private String status;

    @ManyToOne()
    @JoinColumn(name = "id_customer", nullable = false)
    private Customer customer;

    @OneToOne()
    @JoinColumn(name = "id_schedule", nullable = false)
    private Schedule schedule;

    @OneToMany(mappedBy = "booking")
    private Set<BookingDetail> bookingDetailSet;

}