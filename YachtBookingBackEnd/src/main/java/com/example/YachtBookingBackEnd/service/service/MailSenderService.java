package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.service.implement.IMailSender;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor // Tạo constructor (final)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j // Để sử dụng logging từ thư viện Lombok
public class MailSenderService implements IMailSender {
    JavaMailSender mailSender;

    @Override
    public void sendNewMail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    public void sendCancelMail(String to, String idBooking, String reason, String companyName) {
        String subject = "Yacht Booking Cancellation Notice";
        String body = "Dear Customer,\n\n" +
                "We regret to inform you that your booking with ID " + idBooking + " has been cancelled.\n" +
                "Reason: " + reason + "\n\n" +
                "Thank you for you understanding.\n\n" +
                "Best regards,\n" + companyName;
        sendNewMail(to, subject, body);
    }
}
