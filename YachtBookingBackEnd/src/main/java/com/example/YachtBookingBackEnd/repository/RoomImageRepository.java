package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Room;
import com.example.YachtBookingBackEnd.entity.RoomImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomImageRepository extends JpaRepository<RoomImage, String > {
    @Query("SELECT ri from RoomImage ri where ri.room.idRoom =: roomId")
    List<RoomImage> findByRoomId(String roomId);

    List<RoomImage> findAllByRoom( Room room);
}
