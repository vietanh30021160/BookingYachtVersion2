package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.YachtSchedule;
import com.example.YachtBookingBackEnd.entity.key.KeysYachtSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface YachtScheduleRepository extends JpaRepository<YachtSchedule, String> {
    @Query("SELECT ys FROM YachtSchedule ys WHERE ys.yacht.idYacht = :idYacht")
    List<YachtSchedule> findSchedulesByYachtId(@Param("idYacht") String idYacht);

    Optional<YachtSchedule> findByKeys(KeysYachtSchedule keys);
}
