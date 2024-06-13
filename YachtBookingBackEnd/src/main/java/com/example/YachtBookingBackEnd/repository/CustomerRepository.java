package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, String> {
    Customer findCustomerByIdCustomer(String customerId);

}
