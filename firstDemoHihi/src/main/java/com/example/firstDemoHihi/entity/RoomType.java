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

    @OneToMany(mappedBy = "roomType")
    private Set<Room> roomSet;
}