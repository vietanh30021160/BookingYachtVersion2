package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.RoomDTO;
import com.example.YachtBookingBackEnd.dto.RoomImageDTO;
import com.example.YachtBookingBackEnd.dto.RoomScheduleDTO;
import com.example.YachtBookingBackEnd.dto.RoomTypeDTO;
import com.example.YachtBookingBackEnd.entity.Room;
import com.example.YachtBookingBackEnd.entity.RoomImage;
import com.example.YachtBookingBackEnd.entity.RoomType;
import com.example.YachtBookingBackEnd.entity.Yacht;
import com.example.YachtBookingBackEnd.repository.RoomImageRepository;
import com.example.YachtBookingBackEnd.repository.RoomRepository;
import com.example.YachtBookingBackEnd.repository.RoomTypeRepository;
import com.example.YachtBookingBackEnd.repository.YachtRepository;
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
    @Autowired
    private YachtRepository yachtRepository;
    @Autowired
    private RoomTypeRepository roomTypeRepository;

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
            System.out.println("Error by: "+e);
        }
        return roomDTOList;
    }

    @Override
    public List<RoomScheduleDTO> getRoomAndSchedule(String idYacht) {
        return roomRepository.findAllRoomsWithSchedulesByYachtId(idYacht);
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

    @Override
    public boolean addRoom(String roomName,
                           double area,
                           String description,
                           String idRoomType,
                           String idYacht) {
        try{
            Room room = new Room();
            room.setName(roomName);
            room.setArea(area);
            room.setDescription(description);

            RoomType  roomType = roomTypeRepository.findById(idRoomType)
                    .orElseThrow(()-> new RuntimeException("Not found!!!!"));
            room.setRoomType(roomType);

            Yacht yacht = yachtRepository.findById(idYacht)
                    .orElseThrow(()-> new RuntimeException("Not found yacht!"));
            room.setYacht(yacht);
            room.setAvailable(1);
            roomRepository.save(room);
        }catch (Exception e){
            System.out.println("Can't insert room: "+e);
        }
        return false;
    }

    @Override
    public boolean updateRoom(String roomId, String description,  int available) {
        try {
            Room room = roomRepository.findById(roomId)
                    .orElseThrow(()-> new RuntimeException("Not found room!!"));



            if(description!= null){
                room.setDescription(description);
            }else {
                room.setDescription(room.getDescription());
            }

            room.setAvailable(available);
            roomRepository.save(room);
            return  true;
        }catch (Exception e){
            System.out.println("Error by: "+e);

        }
        return false;
    }




}
