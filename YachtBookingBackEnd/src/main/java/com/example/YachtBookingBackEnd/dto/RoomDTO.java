package com.example.YachtBookingBackEnd.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoomDTO {
    private String idRoom;
    private double area;
    private String description;
    private String name;
    private long price;
    private String avatar;
    private RoomTypeDTO roomType;
    private List<RoomImageDTO> roomImageSet;
    private String yachtId;
}
