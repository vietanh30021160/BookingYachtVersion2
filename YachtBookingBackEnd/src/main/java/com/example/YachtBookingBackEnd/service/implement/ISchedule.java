package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.ScheduleDTO;

import java.util.List;

public interface ISchedule {
    List<ScheduleDTO> getAllScheduleByYacht(String yachtId);

    List<ScheduleDTO> getAllSchedule();

}
