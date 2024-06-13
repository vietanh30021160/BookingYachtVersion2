package com.example.YachtBookingBackEnd.dto;

import com.example.YachtBookingBackEnd.entity.Customer;
import com.example.YachtBookingBackEnd.entity.Yacht;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackDTO {
    private String idFeedback;
    private int starRating;
    private String description;
    private String idBooking;
    private Customer customer;
    private Yacht yacht;


}
