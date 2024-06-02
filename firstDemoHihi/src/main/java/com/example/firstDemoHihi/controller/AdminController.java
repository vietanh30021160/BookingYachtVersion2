package com.example.firstDemoHihi.controller;

import com.example.firstDemoHihi.dto.AccountDTO;
import com.example.firstDemoHihi.dto.CompanyDTO;
import com.example.firstDemoHihi.payload.request.AccountCompanyCreationRequest;
import com.example.firstDemoHihi.payload.request.CompanyCreateRequest;
import com.example.firstDemoHihi.payload.response.DataResponse;
import com.example.firstDemoHihi.service.implement.IAdmin;
import com.example.firstDemoHihi.service.implement.ICompany;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admins")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminController {
    IAdmin iAdmin;
    ICompany iCompany;

    @PostMapping("/accounts")
    public ResponseEntity<?> createAccountCompany(@RequestBody @Valid AccountCompanyCreationRequest request) throws Exception {
        DataResponse<AccountDTO> dataResponse = new DataResponse<>();
        dataResponse.setData(iAdmin.createAccountCompany(request));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/accounts")
    public ResponseEntity<?> getAllAccountCompanies() {
        DataResponse<List<AccountDTO>> dataResponse = new DataResponse<>();
        dataResponse.setData(iAdmin.getAllAccountCompanies());

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/companies/{companyName}")
    public ResponseEntity<?> searchCompany(@PathVariable String companyName) {
        DataResponse<CompanyDTO> dataResponse = new DataResponse<>();
        dataResponse.setData(iCompany.searchCompanyByName(companyName));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/companies")
    public ResponseEntity<?> addInfoCompany(@RequestBody CompanyCreateRequest request) {
        DataResponse<CompanyDTO> dataResponse = new DataResponse<>();
        dataResponse.setData(iCompany.addCompany(request));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
