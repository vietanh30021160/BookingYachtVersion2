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
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_room", nullable = false)
    private String idRoom;

    @Column(name = "area")
    private double area;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "name")
    private String name;

    @ManyToOne()
    @JoinColumn(name = "id_room_type", nullable = false)
    private RoomType roomType;

    @ManyToOne()
    @JoinColumn(name = "id_yacht", nullable = false)
    private Yacht yacht;

    @OneToMany(mappedBy = "room")
    private Set<RoomImage> roomImageSet;

    @OneToMany(mappedBy = "room")
    private Set<BookingRoom> bookingRoomSet;
}