package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.dto.YachtImageDTO;
import com.example.YachtBookingBackEnd.entity.YachtImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface YachtImageRepository extends JpaRepository<YachtImage, String> {
    @Query("SELECT yi FROM YachtImage yi WHERE yi.yacht.idYacht = :yachtId")
    List<YachtImage> findByYachtId(@Param("yachtId") String yachtId);


}
