package com.example.firstDemoHihi.repository;

import com.example.firstDemoHihi.dto.YachtDetailDTO;
import com.example.firstDemoHihi.entity.YachtDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface YachtDetailRepository extends JpaRepository<YachtDetail, String> {
    @Query("SELECT yd FROM YachtDetail yd WHERE yd.yacht.idYacht = :yachtId")
    YachtDetail findByYachtId(@Param("yachtId") String yachtId);
}
