package com.example.firstDemoHihi.entity.keys;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class KeysBookingDetailRoom implements Serializable {
    @Column(name = "id_room", length = 255)
    private String idRoom;

    @Column(name = "id_booking_detail", length = 255)
    private String idBookingDetail;
}
