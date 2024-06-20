package com.example.YachtBookingBackEnd.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "service")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_service", nullable = false)
    private String idService;

    @Column(name = "service")
    private String service;

    @Column(name = "price")
    private long price;

    @OneToMany(mappedBy = "service")
    private Set<YachtService> yachtServiceSet;

    @OneToMany(mappedBy = "service")
    private Set<BookingService> bookingServiceSet;
}
