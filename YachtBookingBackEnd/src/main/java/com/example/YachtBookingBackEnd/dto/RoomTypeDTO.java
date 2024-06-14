package com.example.YachtBookingBackEnd.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoomTypeDTO {
    private String idRoomType;
    private String type;
    private String utilities;
    private long price;
}
