package com.example.YachtBookingBackEnd.service.implement;

public interface IForgotPassword {
    String  verifyEmail(String email) ;

    String  veryfiOTP(Integer otp, String email);

    boolean changePassword(String email, String password);
}
