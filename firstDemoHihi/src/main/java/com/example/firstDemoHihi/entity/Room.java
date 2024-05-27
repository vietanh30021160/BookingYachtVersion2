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
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_room", nullable = false, length = 255)
    private String idRoom;

    @ManyToOne()
    @JoinColumn(name = "id_room_type", nullable = false)
    private RoomType roomType;

    @ManyToOne()
    @JoinColumn(name = "id_yacht", nullable = false)
    private Yacht yacht;

    @OneToMany(mappedBy = "room")
    private Set<Booking> bookingSet;

    @OneToMany(mappedBy = "room")
    private Set<RoomRoomService> roomRoomServiceSet;

}