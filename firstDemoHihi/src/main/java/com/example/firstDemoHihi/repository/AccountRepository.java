package com.example.firstDemoHihi.repository;

import com.example.firstDemoHihi.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {
    Account findAccountByUsername(String username);

    boolean existsByUsername(String username);
}
