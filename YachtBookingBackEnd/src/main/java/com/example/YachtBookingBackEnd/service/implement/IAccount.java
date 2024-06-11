package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.AccountDTO;
import com.example.YachtBookingBackEnd.payload.request.AccountCompanyCreationRequest;

import java.util.List;

public interface IAccount {
    boolean createAccountCompany(String username, String password);

    List<AccountDTO> getAllAccountCompanies();

    String createAccountCustomer(String username, String password);
}
