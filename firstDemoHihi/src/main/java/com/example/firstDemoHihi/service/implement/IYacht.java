package com.example.firstDemoHihi.service.implement;

import com.example.firstDemoHihi.dto.YachtDTO;
import com.example.firstDemoHihi.entity.Yacht;
import com.example.firstDemoHihi.payload.request.YachtRequest;

import java.util.List;

public interface IYacht {
    List<YachtDTO> getAllYacht();
//    List<YachtDTO> searchYacht(String keyWord);
    boolean insertYacht(YachtRequest yachtRequest);
}
