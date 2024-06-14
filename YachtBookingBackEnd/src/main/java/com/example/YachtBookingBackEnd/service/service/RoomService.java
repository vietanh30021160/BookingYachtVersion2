package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.RoomDTO;
import com.example.YachtBookingBackEnd.dto.RoomImageDTO;
import com.example.YachtBookingBackEnd.dto.RoomTypeDTO;
import com.example.YachtBookingBackEnd.entity.Room;
import com.example.YachtBookingBackEnd.repository.RoomRepository;
import com.example.YachtBookingBackEnd.service.implement.IRoom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoomService implements IRoom {

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public List<RoomDTO> getAllRoom() {
        List<RoomDTO> roomDTOList = new ArrayList<>();

        try {
            List<Room> roomList = roomRepository.findAll();
            for (Room room: roomList
                 ) {
                RoomDTO roomDTO = new RoomDTO();
                roomDTO.setIdRoom(room.getIdRoom());
                roomDTO.setName(room.getName());
                roomDTO.setDescription(room.getDescription());
                roomDTO.setArea(room.getArea());

                RoomTypeDTO roomTypeDTO = new RoomTypeDTO();
                roomTypeDTO.setIdRoomType(room.getRoomType().getIdRoomType());
                roomTypeDTO.setType(room.getRoomType().getType());
                roomTypeDTO.setPrice(room.getRoomType().getPrice());
                roomTypeDTO.setUtilities(room.getRoomType().getUtilities());

                roomDTO.setRoomType(roomTypeDTO);
                roomDTOList.add(roomDTO);


            }

        }catch (Exception e){

        }
        return roomDTOList;
    }
}
