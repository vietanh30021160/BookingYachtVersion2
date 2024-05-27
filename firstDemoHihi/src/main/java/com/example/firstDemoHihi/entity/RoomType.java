package com.example.firstDemoHihi.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "room_type")
public class RoomType {
    @Id
    @Column(name = "id_room_type", nullable = false, length = 255)
    private String idRoomType;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "price", nullable = false, precision = 10)
    private long price;

    @Column(name = "area", nullable = false, precision = 10)
    private long area;

    @Column(name = "available", nullable = false)
    private int available;

    @Lob
    @Column(name = "description", nullable = false)
    private String description;

    @OneToMany(mappedBy = "roomType")
    private Set<Room> roomSet;

    @OneToMany(mappedBy = "roomType")
    private Set<ImageRoomTypeDetail> imageRoomTypeDetailSet;
}