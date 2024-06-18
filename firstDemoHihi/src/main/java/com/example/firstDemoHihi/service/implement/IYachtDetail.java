package com.example.firstDemoHihi.service.implement;

import com.example.firstDemoHihi.dto.YachtDetailDTO;
import com.example.firstDemoHihi.payload.request.YachtDetailRequest;

public interface IYachtDetail {
    YachtDetailDTO viewYachtDetail(String id);
    YachtDetailDTO findYachtDetailByYacht(String yachtId);
}
