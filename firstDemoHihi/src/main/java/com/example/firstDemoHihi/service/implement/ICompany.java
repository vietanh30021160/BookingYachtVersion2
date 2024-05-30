package com.example.firstDemoHihi.service.implement;

import com.example.firstDemoHihi.dto.CompanyDTO;
import com.example.firstDemoHihi.payload.request.CompanyCreateRequest;

public interface ICompany {
    CompanyDTO addCompany(CompanyCreateRequest request);

    CompanyDTO searchCompanyByName(String name);

//    CompanyDTO updateCompany(String idCompany, CompanyCreateRequest request);
}
