package com.example.YachtBookingBackEnd.entity.key;

import jakarta.persistence.Column;

public class KeysYachtSchedule {
    @Column(name = "id_yacht")
    private String idYacht;

    @Column(name = "id_schedule")
    private String idSchedule;
}
