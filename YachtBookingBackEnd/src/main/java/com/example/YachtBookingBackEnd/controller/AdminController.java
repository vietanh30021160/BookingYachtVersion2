package com.example.YachtBookingBackEnd.controller;

import com.example.YachtBookingBackEnd.dto.AccountDTO;
import com.example.YachtBookingBackEnd.dto.CompanyDTO;
import com.example.YachtBookingBackEnd.payload.response.DataResponse;
import com.example.YachtBookingBackEnd.service.implement.IAccount;
import com.example.YachtBookingBackEnd.service.implement.ICompany;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/admins")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminController {
    ICompany iCompany;
    IAccount iAccount;

    @PostMapping("/accounts")
    public ResponseEntity<?> createAccountCompany(@RequestParam String username,
                                                  @RequestParam String password) throws Exception {
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iAccount.createAccountCompany(username, password));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/accounts")
    public ResponseEntity<?> getAllAccountCompanies() {
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iAccount.getAllAccountCompanies());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/companies")
    public ResponseEntity<?> searchCompany(@RequestParam String companyName) {
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCompany.searchCompanyByName(companyName));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/companies")
    public ResponseEntity<?> addInfoCompany(@RequestParam String idAccount,
                                            @RequestParam String name,
                                            @RequestParam String address,
                                            @RequestParam MultipartFile logo,
                                            @RequestParam String email) {
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCompany.addCompany(idAccount, name, address, logo, email));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/companies/details")
    public ResponseEntity<?> getDetailCompanyByID(@RequestParam String idAccount) {
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCompany.getDetailCompanyByAccountID(idAccount));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/companies")
    public ResponseEntity<?> hideCompany(@RequestParam String idCompany) {
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCompany.hideCompany(idCompany));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
