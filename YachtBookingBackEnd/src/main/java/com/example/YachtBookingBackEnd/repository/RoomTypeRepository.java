package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoomTypeRepository extends JpaRepository<RoomType, String> {
    @Query("SELECT rt FROM RoomType rt " +
            "JOIN rt.roomSet r " +
            "JOIN r.yacht y " +
            "WHERE y.idYacht = :yachtId")
    List<RoomType> findAllRoomTypeByYachtId(@Param("yachtId") String yachtId);

}
