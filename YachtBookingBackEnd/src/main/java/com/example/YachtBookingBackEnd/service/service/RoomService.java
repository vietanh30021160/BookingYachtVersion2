package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.RoomDTO;
import com.example.YachtBookingBackEnd.dto.RoomImageDTO;
import com.example.YachtBookingBackEnd.dto.RoomTypeDTO;
import com.example.YachtBookingBackEnd.entity.Room;
import com.example.YachtBookingBackEnd.entity.RoomImage;
import com.example.YachtBookingBackEnd.repository.RoomImageRepository;
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

    @Autowired
    private RoomImageRepository roomImageRepository;

    @Override
    public List<RoomDTO> getAllRoom() {
        List<RoomDTO> roomDTOList = new ArrayList<>();

        try {
            List<Room> roomList = roomRepository.findAll();
            for (Room room : roomList
            ) {
                RoomDTO roomDTO = new RoomDTO();
                roomDTO.setIdRoom(room.getIdRoom());
                roomDTO.setName(room.getName());

                roomDTO.setArea(room.getArea());

                RoomTypeDTO roomTypeDTO = new RoomTypeDTO();


                roomTypeDTO.setPrice(room.getRoomType().getPrice());


                roomDTO.setRoomType(roomTypeDTO);
                roomDTOList.add(roomDTO);
            }

        } catch (Exception e) {

        }
        return roomDTOList;
    }

    @Override
    public RoomDTO getRoomByID(String roomId) {

        RoomDTO roomDTO = new RoomDTO();
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Not found"));

        try {

            roomDTO.setIdRoom(roomId);
            roomDTO.setName(room.getName());
            roomDTO.setDescription(room.getDescription());
            roomDTO.setArea(room.getArea());
            roomDTO.setAvailable(room.getAvailable());
            RoomTypeDTO roomTypeDTO = new RoomTypeDTO();
            roomTypeDTO.setIdRoomType(room.getRoomType().getIdRoomType());
            roomTypeDTO.setType(room.getRoomType().getType());
            roomTypeDTO.setPrice(room.getRoomType().getPrice());
            roomTypeDTO.setUtilities(room.getRoomType().getUtilities());

            roomDTO.setRoomType(roomTypeDTO);

            List<RoomImageDTO> roomImageDTOList = new ArrayList<>();

            List<RoomImage> roomImages = roomImageRepository.findAllByRoom(room);
            for (RoomImage roomImage : roomImages
            ) {
                RoomImageDTO roomImageDTO = new RoomImageDTO();
                roomImageDTO.setIdRoomImage(roomImage.getIdRoomImage());
                roomImageDTO.setImageRoom(roomImage.getImageRoom());
                roomImageDTOList.add(roomImageDTO);
            }

            roomDTO.setRoomImageSet(roomImageDTOList);
        } catch (Exception e) {

        }
        return roomDTO;

    }
}
