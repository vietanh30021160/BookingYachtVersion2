package com.example.firstDemoHihi.repository;

import com.example.firstDemoHihi.entity.Yacht;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface YachtRepository extends JpaRepository<Yacht, String> {

}
