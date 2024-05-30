package com.example.firstDemoHihi.service.implement;

import com.example.firstDemoHihi.dto.FeedbackDTO;

import java.util.List;

public interface IFeedback {
    List<FeedbackDTO> findFeedbackByYachtDetailId(String yachtDetailId);
}
