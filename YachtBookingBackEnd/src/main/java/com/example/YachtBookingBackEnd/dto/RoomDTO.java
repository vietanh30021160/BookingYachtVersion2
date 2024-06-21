package com.example.YachtBookingBackEnd.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomDTO {
    private String idRoom;
    private String description;
    private String name;
    private long price;
    private double area;
//    private int available;
    private RoomTypeDTO roomType;
    private List<RoomImageDTO> roomImageSet;
}
