package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.dto.RoomTypeDTO;
import com.example.YachtBookingBackEnd.entity.RoomType;
import com.example.YachtBookingBackEnd.entity.Yacht;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RoomTypeRepository extends JpaRepository<RoomType, String> {
    @Query("SELECT rt FROM RoomType rt WHERE rt.yacht.idYacht = :yachtId")
    List<RoomType> findAllByYachtId(@Param("yachtId") String yachtId);

    List<RoomType> findAllByYacht(Yacht   yacht);

    @Query(value = "SELECT rt.* FROM room_type rt " +
            "INNER JOIN room r ON rt.id_room_type = r.id_room_type " +
            "INNER JOIN yacht y ON r.id_yacht = y.id_yacht " +
            "WHERE y.id_yacht = :idYacht " +
            "ORDER BY rt.price DESC LIMIT 1", nativeQuery = true)
    RoomType findHighestPricedRoomTypeByYachtId(@Param("idYacht") String idYacht);

    @Query(value = "SELECT rt.* FROM room_type rt " +
            "INNER JOIN room r ON rt.id_room_type = r.id_room_type " +
            "INNER JOIN yacht y ON r.id_yacht = y.id_yacht " +
            "WHERE y.id_yacht = :idYacht " +
            "ORDER BY rt.price asc LIMIT 1", nativeQuery = true)
    RoomType findLowestPricedRoomTypeByYachtId(@Param("idYacht") String idYacht);


}
