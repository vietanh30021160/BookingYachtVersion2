package com.example.YachtBookingBackEnd.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {
    String idBooking;
    String idCustomer;
    String fullName;
    String requirement;
    LocalDateTime bookingTime;
    String roomType;
    long roomPrice;
    String service;
    long servicePrice;
    String scheduleId;
    long amount;
    String  status;
}
