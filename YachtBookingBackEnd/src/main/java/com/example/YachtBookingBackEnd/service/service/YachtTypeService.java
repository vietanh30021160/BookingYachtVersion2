package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.YachtTypeDTO;
import com.example.YachtBookingBackEnd.entity.YachtType;
import com.example.YachtBookingBackEnd.repository.YachtTypeRepository;
import com.example.YachtBookingBackEnd.service.implement.IYachtType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class YachtTypeService implements IYachtType {
    @Autowired
    YachtTypeRepository yachtTypeRepository;

    @Override
    public List<YachtTypeDTO> getYachtTypes() {
        List<YachtTypeDTO> listYachtTypeDTO = new ArrayList<>();

        try {
            List<YachtType> yachtTypes = yachtTypeRepository.findAll();
            for (YachtType yachtType : yachtTypes) {
                YachtTypeDTO yachtTypeDTO = new YachtTypeDTO();
                yachtTypeDTO.setIdYachtType(yachtType.getIdYachtType());
                yachtTypeDTO.setStarRanking(yachtType.getStarRanking());

                listYachtTypeDTO.add(yachtTypeDTO);
            }
        } catch (Exception e) {
            System.out.println("error in YachtTypeDTO " + e.getMessage());
        }
        return listYachtTypeDTO;
    }
}
