package com.example.YachtBookingBackEnd.entity;

import com.example.YachtBookingBackEnd.entity.key.KeysBookingService;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "booking_service")
public class BookingService {
    @EmbeddedId
    KeysBookingService keys;

    @ManyToOne()
    @JoinColumn(name = "id_service", insertable = false, updatable = false)
    private Service service;

    @ManyToOne()
    @JoinColumn(name = "id_booking", insertable = false, updatable = false)
    private BookingOrder bookingOrder;

}