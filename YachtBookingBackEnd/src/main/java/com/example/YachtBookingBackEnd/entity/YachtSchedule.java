package com.example.YachtBookingBackEnd.entity;

import com.example.YachtBookingBackEnd.entity.key.KeysYachtSchedule;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "yacht_schedule")
public class YachtSchedule {
    @EmbeddedId
    KeysYachtSchedule keys;

    @ManyToOne()
    @JoinColumn(name = "id_yacht", insertable = false, updatable = false)
    private Yacht yacht;

    @ManyToOne()
    @JoinColumn(name = "id_schedule", insertable = false, updatable = false)
    private Schedule schedule;

}