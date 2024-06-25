package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.RoomImageDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IRoomImage {
    boolean insertRoomImages(String roomId, MultipartFile image);

    boolean updateRoomImage(String imageId, MultipartFile image);

    boolean deleteRoomImage(String imageId);

    List<RoomImageDTO> getAllImageByIdRoom(String roomId);
}
