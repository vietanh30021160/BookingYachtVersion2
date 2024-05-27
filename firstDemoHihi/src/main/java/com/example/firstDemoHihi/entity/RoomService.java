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
@Table(name = "room_service")
public class RoomService {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_room_service", nullable = false, length = 255)
    private String idRoomService;

    @Column(name = "service", nullable = false)
    private String service;

    @OneToMany(mappedBy = "roomService")
    private Set<RoomRoomService> roomRoomServiceSet;

}