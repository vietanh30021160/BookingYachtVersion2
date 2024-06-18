package com.example.YachtBookingBackEnd.entity.key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class KeysYachtSchedule {
    @Column(name = "id_yacht")
    private String idYacht;

    @Column(name = "id_schedule")
    private String idSchedule;
}
