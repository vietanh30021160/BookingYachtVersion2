package com.example.YachtBookingBackEnd.entity.key;

import jakarta.persistence.Column;

public class KeysYachtService {
    @Column(name = "id_yacht")
    private String idYacht;

    @Column(name = "id_service")
    private String idService;
}
