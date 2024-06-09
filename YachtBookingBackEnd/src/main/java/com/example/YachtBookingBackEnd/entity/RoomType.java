package com.example.YachtBookingBackEnd.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "room_type")
public class RoomType {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_room_type", nullable = false)
    private String idRoomType;

    @Column(name = "type")
    private String type;

    @Column(name = "price")
    private long price;

    @OneToMany(mappedBy = "roomType")
    private Set<Room> roomSet;
}