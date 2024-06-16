package com.example.YachtBookingBackEnd.controller;

import com.example.YachtBookingBackEnd.entity.BookingOrder;
import com.example.YachtBookingBackEnd.payload.response.DataResponse;
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
@RequestMapping("/api/payment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentController {
    IPayment iPayment;

    @PostMapping("/vn-pay")
    public ResponseEntity<?> createVnPayPayment(@RequestParam String bankCode,
                                     @RequestParam List<String> selectedRoomIds,
                                     @RequestParam List<String> selectedServiceIds,
                                     @RequestParam String requirement,
                                     HttpServletRequest request) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iPayment.createVnPayPayment(selectedRoomIds, selectedServiceIds, requirement, bankCode, request));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/confirm")
    public ResponseEntity<?> confirmVnPayPayment(@RequestParam String idBookingOrder) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iPayment.confirmBooking(idBookingOrder));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/cancel")
    public ResponseEntity<?> cancelVnPayPayment(@RequestParam String idBookingOrder) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iPayment.cancelBooking(idBookingOrder));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/vn-pay-callback")
    public ResponseEntity<?> handlePaymentCallback(HttpServletResponse response,
                                                    HttpServletRequest request) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iPayment.paymentCallbackHandler(response, request));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
