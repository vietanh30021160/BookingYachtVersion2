package com.example.YachtBookingBackEnd.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDTO {
    private String idSchedule;
    private Instant startDate;
    private Instant endDate;
}
