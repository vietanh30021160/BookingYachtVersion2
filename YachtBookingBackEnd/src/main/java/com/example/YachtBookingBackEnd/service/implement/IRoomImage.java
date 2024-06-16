package com.example.YachtBookingBackEnd.service.implement;

import org.springframework.web.multipart.MultipartFile;

public interface IRoomImage {
    boolean insertRoomImages(String roomId, MultipartFile image);

    boolean updateRoomImage(String imageId, MultipartFile image);

    boolean deleteRoomImage(String imageId);
}
