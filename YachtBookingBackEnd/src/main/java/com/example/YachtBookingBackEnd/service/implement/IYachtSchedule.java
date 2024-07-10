package com.example.YachtBookingBackEnd.service.implement;

import java.time.LocalDateTime;

public interface IYachtSchedule {

    boolean addYachtSchedule(String yachtId, LocalDateTime startDate, LocalDateTime endDate);

    String deleteYachtSchedule(String yachtId, String scheduleId);

    boolean updateYachtSchedule(String yachtId, String scheduleId, LocalDateTime startDate, LocalDateTime endDate);
}
