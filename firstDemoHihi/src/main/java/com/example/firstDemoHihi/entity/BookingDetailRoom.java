package com.example.firstDemoHihi.entity;

import com.example.firstDemoHihi.entity.keys.KeyServiceRoomDetail;
import com.example.firstDemoHihi.entity.keys.KeysBookingDetailRoom;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "booking_detail_room")
public class BookingDetailRoom {
    @EmbeddedId
    KeysBookingDetailRoom keys;

    @ManyToOne()
    @JoinColumn(name = "id_room", insertable = false, updatable = false)
    private Room room;

    @ManyToOne()
    @JoinColumn(name = "id_booking_detail", insertable = false, updatable = false)
    private BookingDetail bookingDetail;

}
