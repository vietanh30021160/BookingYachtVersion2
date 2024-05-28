package com.example.firstDemoHihi.dto;

import com.example.firstDemoHihi.entity.Yacht;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class YachtDetailDTO {
    private String idYachtDetails;
    private LocalDate launch;
    private String hullBody;
    private String description;
    private String rule;
    private String feedback;
    private String itinerary;
    private Yacht yacht;
}
