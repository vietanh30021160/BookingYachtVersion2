package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, String> {
}
