package com.example.YachtBookingBackEnd.entity.key;

import jakarta.persistence.Column;

public class KeysBookingService {
    @Column(name = "id_booking")
    private String idBooking;

    @Column(name = "id_service")
    private String idService;
}
