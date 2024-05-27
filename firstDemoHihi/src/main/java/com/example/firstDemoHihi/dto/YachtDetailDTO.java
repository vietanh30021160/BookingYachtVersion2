package com.example.firstDemoHihi.dto;

import com.example.firstDemoHihi.entity.Yacht;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
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
