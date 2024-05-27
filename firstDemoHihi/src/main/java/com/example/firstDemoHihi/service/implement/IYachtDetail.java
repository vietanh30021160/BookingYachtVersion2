package com.example.firstDemoHihi.service.implement;

import com.example.firstDemoHihi.dto.YachtDetailDTO;
import com.example.firstDemoHihi.payload.request.YachtDetailRequest;

public interface IYachtDetail {
    YachtDetailDTO viewYachtDetail(YachtDetailRequest yachtDetailRequest);
}
