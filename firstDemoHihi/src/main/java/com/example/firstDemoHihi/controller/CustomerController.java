package com.example.firstDemoHihi.controller;

import com.example.firstDemoHihi.payload.request.CustomerCreationRequest;
import com.example.firstDemoHihi.payload.request.CustomerUpdateRequest;
import com.example.firstDemoHihi.payload.response.DataResponse;
import com.example.firstDemoHihi.service.implement.ICustomer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    private ICustomer iCustomer;

    @PostMapping("/createCustomer")
    ResponseEntity<?> createCustomer(@RequestBody CustomerCreationRequest request){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCustomer.createCustomer(request));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/updateCustomer/{customerId}")
    ResponseEntity<?> updateCustomer(@PathVariable String customerId,@RequestBody CustomerUpdateRequest customerUpdateRequest){
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCustomer.updateCustomer(customerId, customerUpdateRequest));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

}
