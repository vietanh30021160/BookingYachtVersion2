package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.dto.RoomScheduleDTO;
import com.example.YachtBookingBackEnd.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, String > {
    @Query("SELECT new com.example.YachtBookingBackEnd.dto.RoomScheduleDTO" +
            "(r.idRoom,r.name,r.area,s.idSchedule,s.startDate,s.endDate,rt.price, rt.type)" +
            " FROM Room r " +
            "JOIN r.yacht y " +
            "JOIN YachtSchedule ys ON y.idYacht = ys.yacht.idYacht " +
            "JOIN Schedule s ON ys.schedule.idSchedule = s.idSchedule " +
            "JOIN r.roomType rt " +
            "WHERE y.idYacht = :idYacht and s.idSchedule=:idSchedule")
    List<RoomScheduleDTO> findAllRoomsWithSchedulesByYachtId(@Param("idYacht") String idYacht,
                                                             @Param("idSchedule") String idSchedule);

}
