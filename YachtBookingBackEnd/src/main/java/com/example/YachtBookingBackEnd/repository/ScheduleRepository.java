package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, String> {
    Optional<Schedule> findByStartDateAndEndDate(Instant startDate, Instant endDate);
}
