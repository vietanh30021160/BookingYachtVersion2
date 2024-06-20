package com.example.YachtBookingBackEnd.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "room_image")
public class RoomImage {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_room_image", nullable = false)
    private String idRoomImage;

    @Lob
    @Column(name = "image_room")
    private String imageRoom;

    @ManyToOne()
    @JoinColumn(name = "id_room", nullable = false)
    private Room room;

}