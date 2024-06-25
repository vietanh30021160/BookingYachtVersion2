package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.RoomDTO;
import com.example.YachtBookingBackEnd.dto.RoomScheduleDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IRoom {

    List<RoomDTO> getAllRoom();


    RoomDTO getRoomByID(String roomId);

    boolean addRoom(String roomName, double area, String description, String idRoomType, String idYacht, MultipartFile avatar);


    boolean updateRoom(String roomId, String description, String roomName, MultipartFile avatar);


    List<RoomScheduleDTO> getRoomAndSchedule(String idYacht, String idSchedule);

    List<RoomDTO> getRoomByYacht(String idYacht);
    List<RoomDTO> getRoomByRoomType(String idRoomType);

    List<RoomDTO> getUnbookedRoomsByYachtAndSchedule(String yachtId, String scheduleId);
}
