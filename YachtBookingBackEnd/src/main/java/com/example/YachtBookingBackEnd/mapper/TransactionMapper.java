package com.example.YachtBookingBackEnd.mapper;

import com.example.YachtBookingBackEnd.dto.TransactionDTO;
import com.example.YachtBookingBackEnd.entity.Transaction;

public class TransactionMapper {
    public static TransactionDTO toDTO(Transaction transaction) {
        TransactionDTO dto = new TransactionDTO();
        dto.setIdTransaction(transaction.getIdTransaction());
        dto.setTransactionDate(transaction.getTransactionDate());
        dto.setAmount(transaction.getAmount());
        dto.setStatus(transaction.getStatus());
        dto.setReceiverBankTranNo(transaction.getReceiverBankTranNo());
        dto.setSenderBankTranNo(transaction.getSenderBankTranNo());
        return dto;
    }
}
