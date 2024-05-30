package com.example.firstDemoHihi.repository;

import com.example.firstDemoHihi.entity.ImageYachtDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageYachtDetailRepository extends JpaRepository<ImageYachtDetail, String> {
    @Query("SELECT i FROM ImageYachtDetail i WHERE i.yachtDetail.idYachtDetail = :idYachtDetail")
    List<ImageYachtDetail> findAllByYachtDetailId(@Param("idYachtDetail") String idYachtDetail);
}
