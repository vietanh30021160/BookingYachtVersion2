package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoomTypeRepository extends JpaRepository<RoomType, String> {
    @Query("SELECT rt from RoomType rt " +
            "JOIN rt.roomSet r " +
            "Join Yacht y " +
            "WHERE y.idYacht =: yachtId")
    List<RoomType> findAllRoomTypeByYachtId(@Param("yachtId") String yachtId);
}
