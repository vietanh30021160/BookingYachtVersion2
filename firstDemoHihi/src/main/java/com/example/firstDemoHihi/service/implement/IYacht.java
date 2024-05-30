package com.example.firstDemoHihi.service.implement;

import com.example.firstDemoHihi.dto.YachtDTO;
import com.example.firstDemoHihi.entity.Yacht;
import com.example.firstDemoHihi.payload.request.YachtRequest;

import java.util.List;

public interface IYacht {
    List<YachtDTO> getAllYacht();
    boolean insertYacht(YachtRequest yachtRequest);
    boolean hiddenYacht(String id);
    boolean updateYacht(YachtRequest yachtRequest);
    List<YachtDTO> findYachtByOwnerId(String ownerId);
}
