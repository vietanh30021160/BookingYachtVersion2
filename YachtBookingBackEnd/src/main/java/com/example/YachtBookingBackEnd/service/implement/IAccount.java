package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.AccountDTO;
import com.example.YachtBookingBackEnd.payload.request.AccountCompanyCreationRequest;

import java.util.List;

public interface IAccount {
    boolean createAccountCompany(String username, String password) throws Exception;
    List<AccountDTO> getAllAccountCompanies();
}
