package com.example.YachtBookingBackEnd.controller;

import com.example.YachtBookingBackEnd.payload.response.DataResponse;
import com.example.YachtBookingBackEnd.service.implement.IAccount;
import com.example.YachtBookingBackEnd.service.implement.ICustomer;
import com.example.YachtBookingBackEnd.service.implement.IPayment;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerController {
    IAccount iAccount;
    ICustomer iCustomer;
    IPayment iPayment;

    @PostMapping("/accounts")
    ResponseEntity<?> register(@RequestParam String username,
                               @RequestParam String password) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iAccount.createAccountCustomer(username, password));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/profile/{idAccount}")
    ResponseEntity<?> addCustomerProfile(@PathVariable String idAccount,
                                         @RequestParam String fullName,
                                         @RequestParam String email,
                                         @RequestParam String phoneNumber,
                                         @RequestParam String address) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCustomer.addCustomer(idAccount, fullName, email, phoneNumber, address));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/payment")
    public ResponseEntity<?> createVnPayPayment(@RequestParam String bankCode,
                                                @RequestParam List<String> selectedRoomIds,
                                                @RequestParam List<String> selectedServiceIds,
                                                @RequestParam String requirement,
                                                @RequestParam String idCustomer,
                                                @RequestParam String idSchedule,
                                                HttpServletRequest request) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iPayment.createVnPayPayment(selectedRoomIds, selectedServiceIds, requirement, bankCode, request, idCustomer, idSchedule));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/payment-callback")
    public ResponseEntity<?> handlePaymentCallback(HttpServletResponse response,
                                                   HttpServletRequest request) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iPayment.paymentCallbackHandler(response, request));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
