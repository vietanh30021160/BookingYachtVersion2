package com.example.firstDemoHihi.service.service;

import com.example.firstDemoHihi.dto.YachtDetailDTO;
import com.example.firstDemoHihi.entity.YachtDetail;
import com.example.firstDemoHihi.payload.request.YachtDetailRequest;
import com.example.firstDemoHihi.repository.YachtDetailRepository;
import com.example.firstDemoHihi.service.implement.IYachtDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class YachtDetailService implements IYachtDetail {

    @Autowired
    YachtDetailRepository yachtDetailRepository;

    @Override
    public YachtDetailDTO viewYachtDetail(YachtDetailRequest yachtDetailRequest) {
        YachtDetailDTO yachtDetailDTO = new YachtDetailDTO();
        try{
            Optional<YachtDetail> yachtDetail = yachtDetailRepository.findById(yachtDetailRequest.getYachtId());
            if(yachtDetail.isPresent()){
                yachtDetailDTO.setDescription(yachtDetail.get().getDescription());
                yachtDetailDTO.setIdYachtDetails(yachtDetail.get().getIdYachtDetail());
                yachtDetailDTO.setFeedback(yachtDetail.get().getFeedback());
                yachtDetailDTO.setLaunch(yachtDetail.get().getLaunch());
                yachtDetailDTO.setRule(yachtDetail.get().getRule());
                yachtDetailDTO.setItinerary(yachtDetail.get().getItinerary());
                yachtDetailDTO.setHullBody(yachtDetail.get().getHullBody());
            }else{
                return null;
            }
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
        return yachtDetailDTO;
    }



}
