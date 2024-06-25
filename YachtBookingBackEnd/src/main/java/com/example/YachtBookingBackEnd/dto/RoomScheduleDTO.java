package com.example.YachtBookingBackEnd.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoomScheduleDTO {
    private String idRoom;
    private String roomName;
    private double area;
    private String idSchedule;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private long price;
    private String  type;

}
