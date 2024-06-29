package com.example.YachtBookingBackEnd.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDTO {
    private String idTransaction;
    private long amount;
    private LocalDateTime transactionDate;
    private String status;
    private String receiverBankTranNo;
    private String senderBankTranNo;
//    private BookingOrderDTO bookingOrderDTO;
}
