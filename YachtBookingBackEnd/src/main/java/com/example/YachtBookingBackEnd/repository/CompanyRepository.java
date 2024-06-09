package com.example.firstDemoHihi.repository;

import com.example.firstDemoHihi.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, String> {
    Optional<Company> findCompanyByName(String name);

    boolean existsCompanyByName(String name);
}
