package com.example.YachtBookingBackEnd.controller;

import com.example.YachtBookingBackEnd.payload.response.DataResponse;
import com.example.YachtBookingBackEnd.service.implement.IAccount;
import com.example.YachtBookingBackEnd.service.implement.ICustomer;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerController {
    IAccount iAccount;
    ICustomer iCustomer;



    @PostMapping("/accounts")
    ResponseEntity<?> register(@RequestParam String username,
                               @RequestParam String password) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iAccount.createAccountCustomer(username, password));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/profile")
    ResponseEntity<?> addCustomerProfile(@RequestParam String idAccount,
                                         @RequestParam String fullName,
                                         @RequestParam String email,
                                         @RequestParam String phoneNumber,
                                         @RequestParam String address) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCustomer.addCustomer(idAccount, fullName, email, phoneNumber, address));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/changePassword/{customerAccountId}")
    ResponseEntity<?> changePassword(@PathVariable String customerAccountId,@RequestParam String password){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iAccount.updateAccount(customerAccountId, password));
        return new ResponseEntity<>(dataResponse,HttpStatus.OK);
    }

    @PutMapping("/updateCustomer/{customerId}")
    ResponseEntity<?> updateCustomer(@PathVariable String customerId,@RequestParam String fullName,
                                     @RequestParam String email,
                                     @RequestParam String phoneNumber,
                                     @RequestParam String address){
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCustomer.updateCustomer(customerId, fullName, email, phoneNumber, address));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/addFeedback/{idBooking}/{idCustomer}/{idYacht}")
    public ResponseEntity<?> addFeedback(@RequestParam int starRating,
                                         @RequestParam String description,
                                         @PathVariable String idBooking,
                                         @PathVariable String idCustomer,
                                         @PathVariable String idYacht) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCustomer.addFeedback(starRating,description,idBooking,idCustomer,idYacht));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
