package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.CompanyDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ICompany {
    boolean addCompany(String idAccount, String name, String address, MultipartFile logo, String email);
    boolean updateCompany(String idCompany, String name,String address, MultipartFile logo, String email);
    List<CompanyDTO> searchCompanyByName(String name);

    CompanyDTO getDetailCompanyByAccountID(String idAccount);

    boolean hideCompany(String idCompany);


}
