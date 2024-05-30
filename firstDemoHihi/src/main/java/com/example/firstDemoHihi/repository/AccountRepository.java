package com.example.firstDemoHihi.repository;

import com.example.firstDemoHihi.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {
    Account findAccountByUsername(String username);

    Optional<Account> findByUsername(String username);

    boolean existsByUsername(String username);
}
