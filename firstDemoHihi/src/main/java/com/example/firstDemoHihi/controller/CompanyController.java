package com.example.firstDemoHihi.controller;


import com.example.firstDemoHihi.payload.request.OwnerRequest;
import com.example.firstDemoHihi.payload.request.YachtDetailRequest;
import com.example.firstDemoHihi.payload.request.YachtRequest;
import com.example.firstDemoHihi.payload.response.DataResponse;
import com.example.firstDemoHihi.service.implement.IOwner;
import com.example.firstDemoHihi.service.implement.IYacht;
import com.example.firstDemoHihi.service.implement.IYachtDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    IYacht iYacht;

    @Autowired
    IOwner iOwner;

    @Autowired
    IYachtDetail iYachtDetailService;

    @GetMapping("/yacht/viewYacht")
    public ResponseEntity<?> viewYacht() {

//        SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//        String enscrypted = Encoders.BASE64.encode(secretKey.getEncoded());
//        System.out.println(enscrypted);
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYacht.getAllYacht());

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/yacht/insertYacht")
    public ResponseEntity<?> insertYacht(@RequestBody YachtRequest yachtRequest) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYacht.insertYacht(yachtRequest));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/owner/viewAllOwner")
    public ResponseEntity<?> getAllOwner() {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iOwner.getAllOwner());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/owner/yacht/detail")
    public ResponseEntity<?> getYachtDetailByYachtId(@RequestBody YachtDetailRequest yachtDetailRequest) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYachtDetailService.viewYachtDetail(yachtDetailRequest));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/owner/insertOwner")
    public ResponseEntity<?> insertOwner(@RequestBody OwnerRequest ownerRequest) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iOwner.insertOwner(ownerRequest));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }


}
