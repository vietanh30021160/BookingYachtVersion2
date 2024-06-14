package com.example.YachtBookingBackEnd.dto;

import com.example.YachtBookingBackEnd.entity.RoomImage;
import com.example.YachtBookingBackEnd.entity.RoomType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoomDTO {
    private String idRoom;
    private double area;
    private String description;
    private String name;
    private int available;
    private RoomTypeDTO roomType;
    private Set<RoomImageDTO> roomImageSet;

}
