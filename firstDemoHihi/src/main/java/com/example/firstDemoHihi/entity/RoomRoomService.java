package com.example.firstDemoHihi.entity;

import com.example.firstDemoHihi.entity.keys.KeyServiceRoomDetail;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "room_room_service")
public class RoomRoomService {
    @EmbeddedId
    KeyServiceRoomDetail keys;

    @ManyToOne()
    @JoinColumn(name = "id_room", insertable = false, updatable = false)
    private Room room;

    @ManyToOne()
    @JoinColumn(name = "id_room_service", insertable = false, updatable = false)
    private RoomService roomService;

}