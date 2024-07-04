package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.dto.RoomTypeDTO;
import com.example.YachtBookingBackEnd.entity.RoomType;
import com.example.YachtBookingBackEnd.entity.Yacht;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomTypeRepository extends JpaRepository<RoomType, String> {
    @Query("SELECT rt FROM RoomType rt WHERE rt.yacht.idYacht = :yachtId")
    List<RoomType> findAllByYacht(String  yachtId);

}
