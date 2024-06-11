package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, String> {
}
