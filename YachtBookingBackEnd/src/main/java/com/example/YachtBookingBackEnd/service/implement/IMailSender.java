package com.example.YachtBookingBackEnd.service.implement;

public interface IMailSender {
    void sendNewMail(String to, String subject, String body);

    void sendCancelMail(String to, String idBooking, String reason, String companyName);

    void senConfirmMail(String to, String idBooking, String companyName);
}
