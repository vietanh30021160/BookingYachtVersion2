package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.RoomDTO;
import com.example.YachtBookingBackEnd.dto.RoomScheduleDTO;

import java.util.List;

public interface IRoom {

    List<RoomDTO> getAllRoom();


    RoomDTO getRoomByID(String roomId);

    boolean addRoom(String roomName, double area, String description, String idRoomType, String idYacht);


    boolean updateRoom(String roomId, String description, int available);

    List<RoomScheduleDTO> getRoomAndSchedule(String idYacht);
}
