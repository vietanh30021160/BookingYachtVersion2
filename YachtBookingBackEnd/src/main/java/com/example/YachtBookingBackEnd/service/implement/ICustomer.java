package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.entity.Customer;

public interface ICustomer {
    boolean addCustomer(String idAccount, String fullName, String email, String phoneNumber, String address);
}
