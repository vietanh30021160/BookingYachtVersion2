package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.RoomTypeDTO;
import com.example.YachtBookingBackEnd.entity.RoomType;

import java.util.List;

public interface IRoomType {
    List<RoomTypeDTO> getAllRoomType(String yachtId);

    boolean addRoomType(String type, long price, String utilities);

    boolean updateRoomType(String roomTypeId, String type, long price, String utilities);

    boolean deleteRoomType(String roomTypeId);
}
