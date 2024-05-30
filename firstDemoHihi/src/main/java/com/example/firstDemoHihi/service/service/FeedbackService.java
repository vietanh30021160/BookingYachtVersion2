package com.example.firstDemoHihi.service.service;

import com.example.firstDemoHihi.dto.FeedbackDTO;
import com.example.firstDemoHihi.entity.Feedback;
import com.example.firstDemoHihi.repository.FeedbackRepository;
import com.example.firstDemoHihi.service.implement.IFeedback;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FeedbackService implements IFeedback {
    @Autowired
    FeedbackRepository feedbackRepository;

    @Override
    public List<FeedbackDTO> findFeedbackByYachtDetailId(String yachtDetailId) {
        List<FeedbackDTO> feedbackDTOList = new ArrayList<>();
        try {
           List<Feedback> feedbackList = feedbackRepository.findFeedbackByYachtDetail(yachtDetailId);
           if(feedbackList != null) {
               for (Feedback feedback : feedbackList) {
                   FeedbackDTO feedbackDTO = new FeedbackDTO();
                   feedbackDTO.setIdFeedback(feedback.getIdFeedback());
                   feedbackDTO.setDescription(feedback.getDescription());
                   feedbackDTOList.add(feedbackDTO);
               }
           }
        }catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return feedbackDTOList;
    }
}
