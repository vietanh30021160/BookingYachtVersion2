package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.DataMailDTO;
import jakarta.mail.MessagingException;

public interface IMail {
    void sendHtmlMail(DataMailDTO dataMail, String templateName) throws MessagingException;


}
