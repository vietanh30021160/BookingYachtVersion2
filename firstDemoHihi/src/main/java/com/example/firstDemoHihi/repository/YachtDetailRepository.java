package com.example.firstDemoHihi.repository;

import com.example.firstDemoHihi.entity.YachtDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface YachtDetailRepository extends JpaRepository<YachtDetail, String> {

}
