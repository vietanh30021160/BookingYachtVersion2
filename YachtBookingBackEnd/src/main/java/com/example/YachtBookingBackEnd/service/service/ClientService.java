package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.DataMailDTO;
import com.example.YachtBookingBackEnd.service.implement.IClient;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ClientService implements IClient {
    @Autowired
    private MailService mailService;
    @Override
    public Boolean create(String name, String username, String email) {
        try {
            DataMailDTO dataMail = new DataMailDTO();

            dataMail.setTo(email);
            dataMail.setSubject("Const.SEND_MAIL_SUBJECT.CLIENT_REGISTER");

            Map<String, Object> props = new HashMap<>();
            props.put("name", name);
            props.put("username", username);
            props.put("password", 123123);
            dataMail.setProps(props);

            mailService.sendHtmlMail(dataMail, "ThymeleafTemplate");
            return true;
        } catch (MessagingException exp){
            exp.printStackTrace();
        }
        return false;
    }
}
