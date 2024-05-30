package com.example.firstDemoHihi.repository;

import com.example.firstDemoHihi.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Account, String> {
}
