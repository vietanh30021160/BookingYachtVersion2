package com.example.YachtBookingBackEnd.entity.key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class KeysBookingService {
    @Column(name = "id_booking")
    private String idBooking;

    @Column(name = "id_service")
    private String idService;
}
