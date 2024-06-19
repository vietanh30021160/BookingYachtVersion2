package com.example.YachtBookingBackEnd.service.implement;

import java.time.Instant;
import java.util.Date;

public interface IYachtSchedule {

    boolean addYachtSchedule(String yachtId, Instant startDate, Instant endDate);

    boolean deleteYachtSchedule(String yachtId, String scheduleId);

    boolean updateYachtSchedule(String yachtId, String scheduleId, Instant startDate, Instant endDate);
}
