package com.example.firstDemoHihi.service.implement;

import com.example.firstDemoHihi.dto.AcountDTO;
import com.example.firstDemoHihi.payload.request.AccountCreationRequest;
import com.example.firstDemoHihi.payload.request.AccountUpdate;

import java.util.List;

public interface IAccount {
    boolean createAccount(AccountCreationRequest request);
    List<AcountDTO> getAccountCustomer();
    AcountDTO get1Account(String  id);
    void deleteAccount(String id);
    boolean updateAccount(String customerId, AccountUpdate request);
}
