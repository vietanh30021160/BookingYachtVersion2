package com.example.firstDemoHihi.service.service;

import com.example.firstDemoHihi.dto.ImageYachtDetailDTO;
import com.example.firstDemoHihi.entity.ImageYachtDetail;
import com.example.firstDemoHihi.repository.ImageYachtDetailRepository;
import com.example.firstDemoHihi.service.implement.IImageYachtDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class ImageYachtDetailService implements IImageYachtDetail {
    @Autowired
    ImageYachtDetailRepository imageYachtDetailRepository;

    @Override
    public List<ImageYachtDetailDTO> getImageYachtDetail(String yachtDetailId) {
        List<ImageYachtDetailDTO> imageYachtDetailDTOList = new ArrayList<>();
        try{
            List<ImageYachtDetail> imageYachtDetailList = imageYachtDetailRepository.findAllByYachtDetailId(yachtDetailId);
            if(imageYachtDetailList != null){
                for (ImageYachtDetail imageYachtDetail : imageYachtDetailList) {
                    ImageYachtDetailDTO imageYachtDetailDTO = new ImageYachtDetailDTO();
                    imageYachtDetailDTO.setId(imageYachtDetail.getIdImageYachtDetail());
                    imageYachtDetailDTO.setImage(imageYachtDetail.getImage());
                    imageYachtDetailDTOList.add(imageYachtDetailDTO);
                }
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return imageYachtDetailDTOList;
    }
}
