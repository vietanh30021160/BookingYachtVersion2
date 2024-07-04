package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.entity.Transaction;
import com.example.YachtBookingBackEnd.repository.TransactionRepository;
import com.example.YachtBookingBackEnd.service.implement.ITransaction;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TransactionService implements ITransaction {
    TransactionRepository transactionRepository;

    public static final String DEFAULT_STATUS = "Pending";

    @Override
    @Transactional
    public void autoCancelTransaction() {
        LocalDateTime now = LocalDateTime.now();
        List<Transaction> listTransactionPending = transactionRepository.getTransactionByStatus(DEFAULT_STATUS);

        for (Transaction transaction : listTransactionPending) {
            LocalDateTime transactionTime = transaction.getTransactionDate();
            boolean isTimeout = now.isAfter(transactionTime.plusMinutes(15));
            boolean isPending = transaction.getStatus().equals(DEFAULT_STATUS);

            if (isTimeout && isPending) {
                transaction.setStatus("Failure");
                transactionRepository.save(transaction);
            }
        }
    }
}
