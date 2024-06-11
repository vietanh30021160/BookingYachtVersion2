package com.example.YachtBookingBackEnd.controller;

import com.example.YachtBookingBackEnd.payload.response.DataResponse;
import com.example.YachtBookingBackEnd.service.implement.IAccount;
import com.example.YachtBookingBackEnd.service.implement.ICompany;
import com.example.YachtBookingBackEnd.service.implement.ICustomer;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/admins")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminController {
    ICustomer iCustomer;
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

    @GetMapping("/account/getAllAccountCustomer")
    public ResponseEntity<?> accountList(){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iAccount.getAccountCustomer());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/account/{customerAccountId}")
    public ResponseEntity<?> getAccount(@PathVariable("customerAccountId") String customerAccountId)  {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iAccount.get1Account(customerAccountId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/getAllCustomer")
    ResponseEntity<?> customerList(){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCustomer.getAllCustomer());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/getCustomerById/{customerId}")
    ResponseEntity<?> getCustomerById(@PathVariable("customerId") String customerId){
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCustomer.getCustomer(customerId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

}
