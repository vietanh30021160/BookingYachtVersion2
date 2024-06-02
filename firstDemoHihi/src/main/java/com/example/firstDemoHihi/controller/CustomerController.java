package com.example.firstDemoHihi.controller;


import com.example.firstDemoHihi.payload.request.AccountCreationRequest;
import com.example.firstDemoHihi.payload.request.AccountUpdate;
import com.example.firstDemoHihi.payload.request.CustomerCreationRequest;
import com.example.firstDemoHihi.payload.request.CustomerUpdateRequest;
import com.example.firstDemoHihi.payload.response.DataResponse;
import com.example.firstDemoHihi.service.implement.IAccount;
import com.example.firstDemoHihi.service.implement.ICustomer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private ICustomer iCustomer;
    @Autowired
    private IAccount iAccount;

    @PostMapping("/account/createCustomerAccount")
    public ResponseEntity<?> createAccount(@RequestBody AccountCreationRequest request){
        DataResponse dataResponse= new DataResponse<>();
        boolean isSuccess = iAccount.createAccount(request);
        dataResponse.setSuccess(isSuccess);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/account/getAllAccount")
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



    @DeleteMapping("/account/{customerAccountId}")
    public ResponseEntity<?> deleteCustomerAccount(@PathVariable("customerAccountId") String customerAccountId){
        DataResponse dataResponse = new DataResponse();
        iAccount.deleteAccount(customerAccountId);
        if(iAccount.get1Account(customerAccountId)==null){
            dataResponse.setData("Account has been deleted.");
        }

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/createCustomer")
    ResponseEntity<?> createCustomer(@RequestBody CustomerCreationRequest request){
        DataResponse dataResponse = new DataResponse();

        dataResponse.setData(iCustomer.createCustomer(request));
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

    @PutMapping("/account/{customerAccountId}")
    public ResponseEntity<?> updateAccount(@PathVariable String customerAccountId,@RequestBody AccountUpdate request)  {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iAccount.updateAccount(customerAccountId, request));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/updateCustomer/{customerId}")
    ResponseEntity<?> updateCustomer(@PathVariable String customerId,@RequestBody CustomerUpdateRequest customerUpdateRequest){
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCustomer.updateCustomer(customerId, customerUpdateRequest));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }


}
