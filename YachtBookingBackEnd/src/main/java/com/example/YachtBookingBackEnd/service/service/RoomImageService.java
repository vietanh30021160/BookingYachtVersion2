package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.entity.Room;
import com.example.YachtBookingBackEnd.entity.RoomImage;
import com.example.YachtBookingBackEnd.repository.RoomImageRepository;
import com.example.YachtBookingBackEnd.repository.RoomRepository;
import com.example.YachtBookingBackEnd.service.implement.IRoomImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class RoomImageService implements IRoomImage {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private RoomImageRepository roomImageRepository;
    @Override
    public boolean insertRoomImages(String roomId, MultipartFile image) {
        try {
            Room room = roomRepository.findById(roomId)
                    .orElseThrow(()-> new RuntimeException("Not found room"));

            RoomImage roomImage = new RoomImage();
            roomImage.setRoom(room);
            roomImage.setImageRoom(image.getOriginalFilename());
            roomImageRepository.save(roomImage);
            return  true;

        }catch (Exception e){
            System.out.println("Error by: "+ e);
        }
        return false;
    }

    @Override
    public boolean updateRoomImage(String imageId, MultipartFile image) {
        try {
            RoomImage roomImage = roomImageRepository.findById(imageId)
                    .orElseThrow(()-> new RuntimeException("Not found"));
            roomImage.setImageRoom(image.getOriginalFilename());
            roomImageRepository.save(roomImage);
            return true;
        }catch (Exception e){
            System.out.println("Error by: "+ e);
        }
        return false;
    }

    @Override
    public boolean deleteRoomImage(String imageId) {
        try {
            RoomImage roomImage = roomImageRepository.findById(imageId)
                    .orElseThrow(()-> new RuntimeException("Not found"));
            roomImageRepository.delete(roomImage);
            return true;
        }catch (Exception e){
            System.out.println("Error by: "+ e);
        }
        return false;
    }
}
