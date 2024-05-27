package com.example.firstDemoHihi.entity.keys;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class KeyServiceRoomDetail implements Serializable {
    @Column(name = "id_room", length = 255)
    private String idRoom;

    @Column(name = "id_room_service", length = 255)
    private String idRoomService;
}
