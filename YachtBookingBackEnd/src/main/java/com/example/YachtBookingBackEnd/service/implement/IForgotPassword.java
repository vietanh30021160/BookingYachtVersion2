package com.example.YachtBookingBackEnd.service.implement;

import jakarta.mail.MessagingException;

public interface IForgotPassword {
    String  verifyEmail(String email) ;
}
