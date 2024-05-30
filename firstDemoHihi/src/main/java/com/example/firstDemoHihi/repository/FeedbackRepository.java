package com.example.firstDemoHihi.repository;

import com.example.firstDemoHihi.entity.Feedback;
import com.example.firstDemoHihi.entity.YachtDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, String> {
    @Query("SELECT f FROM Feedback f WHERE f.yachtDetail.idYachtDetail = :idYachtDetail")
    List<Feedback> findFeedbackByYachtDetail(@Param("idYachtDetail") String idYachtDetail);
}
