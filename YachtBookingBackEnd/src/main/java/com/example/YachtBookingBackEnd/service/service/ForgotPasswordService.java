package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.DataMailDTO;
import com.example.YachtBookingBackEnd.entity.Account;
import com.example.YachtBookingBackEnd.entity.Customer;
import com.example.YachtBookingBackEnd.entity.ForgotPassword;
import com.example.YachtBookingBackEnd.repository.AccountRepository;
import com.example.YachtBookingBackEnd.repository.CustomerRepository;
import com.example.YachtBookingBackEnd.repository.ForgotPasswordRepository;
import com.example.YachtBookingBackEnd.service.implement.IForgotPassword;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class ForgotPasswordService implements IForgotPassword {

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private ForgotPasswordRepository forgotPasswordRepository;
    MailService mailService;

    @Override
    public String verifyEmail(String email) throws MessagingException {

        Customer customer = customerRepository.findCustomerByEmail(email);
        Account account = accountRepository.findAccountByCustomer(customer);

        int otp  = generateOTP();

        Map<String, Object> props = new HashMap<>();
        props.put("name", customer.getFullName());
        props.put("username", account.getUsername());
        props.put("password", otp);

        DataMailDTO dataMailDTO = DataMailDTO.builder()
                .to(email)
                .content("This is for your Forgot Password request: "+otp)
                .subject("OTP for Forgot Password request.")
                .props(props)
                .build();

        ForgotPassword forgotPassword = new ForgotPassword();

        forgotPassword.setOtp(otp);
        forgotPassword.setExpirationTime(new Date(System.currentTimeMillis()+70*1000));
        forgotPassword.setAccount(account);

        mailService.sendHtmlMail(dataMailDTO, "ThymeleafTemplate");

        return "Email sent for verification.";
    }

    private int generateOTP() {
        Random random= new Random();
        return random.nextInt(100_000, 999_999);
    }
}
