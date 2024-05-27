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

    @Column(name = "bookingTime", nullable = false)
    private LocalDateTime bookingTime;

    @ManyToOne()
    @JoinColumn(name = "id_yacht", nullable = false)
    private Yacht yacht;

    @Column(name = "id_schedule", nullable = false, length = 255)
    private String idSchedule;

    @ManyToOne()
    @JoinColumn(name = "id_room", nullable = false)
    private Room room;

    @ManyToOne()
    @JoinColumn(name = "id_customer", nullable = false)
    private Customer customer;

    @OneToOne(mappedBy = "booking")
    private Schedule schedule;

    @OneToMany(mappedBy = "booking")
    private Set<BookingDetail> bookingDetailSet;

}