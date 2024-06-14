package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.RoomDTO;

import java.util.List;

public interface IRoom {

    List<RoomDTO> getAllRoom();


    RoomDTO getRoomByID(String roomId);
}
