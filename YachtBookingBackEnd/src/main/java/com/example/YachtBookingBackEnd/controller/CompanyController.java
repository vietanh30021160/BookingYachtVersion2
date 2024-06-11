package com.example.YachtBookingBackEnd.controller;

import com.example.YachtBookingBackEnd.payload.response.DataResponse;
import com.example.YachtBookingBackEnd.service.implement.ICompany;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CompanyController {
    ICompany iCompany;

    @PostMapping("/profile")
    public ResponseEntity<?> addInfoCompany(@RequestParam String idAccount,
                                            @RequestParam String name,
                                            @RequestParam String address,
                                            @RequestParam MultipartFile logo,
                                            @RequestParam String email) {
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCompany.addCompany(idAccount, name, address, logo, email));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
