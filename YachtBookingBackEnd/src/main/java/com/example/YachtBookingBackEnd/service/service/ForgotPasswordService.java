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
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

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
    @Autowired
    JavaMailSender mailSender;
    @Autowired
    private SpringTemplateEngine templateEngine;

    @Override
    public String verifyEmail(String email) {
        try {
            Customer customer = customerRepository.findCustomerByEmail(email);
            Account account = accountRepository.findAccountByCustomer(customer);

            int otp = generateOTP();

            Map<String, Object> props = new HashMap<>();
            props.put("name", customer.getFullName());
            props.put("username", customer.getAccount().getUsername());
            props.put("password", otp);

            ForgotPassword forgotPassword = new ForgotPassword();

            forgotPassword.setOtp(otp);
            forgotPassword.setExpirationTime(new Date(System.currentTimeMillis() + 70 * 1000));
            forgotPassword.setAccount(account);
            System.out.println(forgotPassword);


            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
            Context context = new Context();
            context.setVariables(props);
            String html = templateEngine.process("ThymeleafTemplate", context);

            helper.setTo(email);
            helper.setSubject("OTP for Forgot Password request.");
            helper.setText(html, true);

            mailSender.send(message);
            forgotPasswordRepository.save(forgotPassword);

            return "Email sent for verification.";
        }catch (Exception e){
            System.out.println("Email k ton tai.");
        }
        return null;
    }

    private int generateOTP() {
        Random random= new Random();
        return random.nextInt(100_000, 999_999);
    }
}
