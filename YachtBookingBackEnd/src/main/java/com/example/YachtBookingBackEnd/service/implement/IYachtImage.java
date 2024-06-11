package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.YachtImageDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IYachtImage {
    List<YachtImageDTO> getImageByYacht(String yachtId);
    boolean addImage(MultipartFile image, String yachtId);
    boolean deleteImage(String imageId);
}
