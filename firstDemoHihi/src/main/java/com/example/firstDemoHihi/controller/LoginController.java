package com.example.firstDemoHihi.controller;

import com.example.firstDemoHihi.payload.response.DataResponse;
import com.example.firstDemoHihi.security.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/login")
public class LoginController {

    @Autowired
    JwtHelper jwtHelper;
    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestParam String username, @RequestParam String password) {
        DataResponse dataResponse = new DataResponse();
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));
            if (authentication.isAuthenticated()) {
                String token = jwtHelper.generateToken(username);
                dataResponse.setData(token);
                dataResponse.setSuccess(true);
                return new ResponseEntity<>(dataResponse, HttpStatus.OK);
            }
        } catch (AuthenticationException e) {
            dataResponse.setData("Invalid credentials");
            dataResponse.setSuccess(false);
            return new ResponseEntity<>(dataResponse, HttpStatus.UNAUTHORIZED);
        }
        dataResponse.setData("Authentication failed");
        dataResponse.setSuccess(false);
        return new ResponseEntity<>(dataResponse, HttpStatus.UNAUTHORIZED);
    }
}
