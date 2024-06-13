package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service,String> {
    Service findByService(String service);
}
