package com.example.firstDemoHihi.repository;

import com.example.firstDemoHihi.entity.YachtType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface YachtTypeRepository extends JpaRepository<YachtType, String> {
}
