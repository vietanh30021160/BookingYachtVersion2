package com.example.YachtBookingBackEnd.entity.key;

import jakarta.persistence.Column;

public class KeysBookingRoom {
    @Column(name = "id_room")
    private String idRoom;

    @Column(name = "id_booking")
    private String idBooking;
}
