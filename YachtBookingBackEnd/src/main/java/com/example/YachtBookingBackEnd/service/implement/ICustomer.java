package com.example.YachtBookingBackEnd.service.implement;


import com.example.YachtBookingBackEnd.dto.CompanyDTO;
import com.example.YachtBookingBackEnd.dto.CustomerDTO;
import com.example.YachtBookingBackEnd.dto.FeedbackDTO;
import com.example.YachtBookingBackEnd.entity.Company;

import java.util.List;


public interface ICustomer {
    String addCustomer(String idAccount, String fullName, String email, String phoneNumber, String address);

    List<CustomerDTO> getAllCustomer();

    CustomerDTO getCustomer(String  id);

    boolean updateCustomer(String customerId, String fullName, String email, String phone, String address);

    CustomerDTO findCustomerByUsername(String username);

    boolean addFeedback(int starRating, String description, String idBooking, String idCustomer, String idYacht );

    List<FeedbackDTO> getFeedbackByYachtId(String yachtId);

    List<CompanyDTO> getAllCompanies();

    boolean changePasswordCustomer(String idCustomer, String password);
}
