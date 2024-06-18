package com.example.YachtBookingBackEnd.entity;

import com.example.YachtBookingBackEnd.entity.key.KeysYachtService;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "yacht_service")
public class YachtService {
    @EmbeddedId
    KeysYachtService keys;

    @ManyToOne()
    @JoinColumn(name = "id_service", insertable = false, updatable = false)
    private Service service;

    @ManyToOne()
    @JoinColumn(name = "id_yacht", insertable = false, updatable = false)
    private Yacht yacht;

}