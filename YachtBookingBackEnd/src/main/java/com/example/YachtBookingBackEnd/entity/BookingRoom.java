package com.example.YachtBookingBackEnd.entity;

import com.example.YachtBookingBackEnd.entity.key.KeysBookingRoom;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "booking_room")
public class BookingRoom {
    @EmbeddedId
    KeysBookingRoom keys;

    @ManyToOne()
    @JoinColumn(name = "id_room", insertable = false, updatable = false)
    private Room room;

    @ManyToOne()
    @JoinColumn(name = "id_booking", insertable = false, updatable = false)
    private BookingOrder bookingOrder;
}