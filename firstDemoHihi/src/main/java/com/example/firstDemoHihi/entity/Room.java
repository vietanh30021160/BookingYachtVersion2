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

    @Column(name = "price", nullable = false)
    private long price;

    @Column(name = "area", nullable = false)
    private double area;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "avalable", nullable = false)
    private int avalable;

    @ManyToOne()
    @JoinColumn(name = "id_room_type", nullable = false)
    private RoomType roomType;

    @ManyToOne()
    @JoinColumn(name = "id_yacht", nullable = false)
    private Yacht yacht;

    @OneToMany(mappedBy = "room")
    private Set<ImagesRoom> imagesRoomSet;

    @OneToMany(mappedBy = "room")
    private Set<RoomRoomService> roomRoomServiceSet;

    @OneToMany(mappedBy = "room")
    private Set<BookingDetailRoom> bookingDetailRoomSet;


}