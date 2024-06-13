package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, String> {

}
