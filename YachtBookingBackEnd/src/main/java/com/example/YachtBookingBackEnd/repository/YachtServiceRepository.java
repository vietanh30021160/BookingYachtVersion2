package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.YachtService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface YachtServiceRepository extends JpaRepository<YachtService, String > {
    List<YachtService> findYachtServicesByYacht_IdYacht(String  yachtId);
}
