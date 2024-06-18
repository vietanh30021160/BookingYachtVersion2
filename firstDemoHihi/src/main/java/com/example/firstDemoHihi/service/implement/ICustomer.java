package com.example.firstDemoHihi.service.implement;

import com.example.firstDemoHihi.dto.CustomerDTO;
import com.example.firstDemoHihi.payload.request.CustomerCreationRequest;
import com.example.firstDemoHihi.payload.request.CustomerUpdateRequest;

import java.util.List;

public interface ICustomer {
    public boolean createCustomer(CustomerCreationRequest request);
    List<CustomerDTO> getAllCustomer();

    CustomerDTO getCustomer(String  id);

    boolean updateCustomer(String customerId, CustomerUpdateRequest customerUpdateRequest);

}