package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.BillDTO;
import com.example.YachtBookingBackEnd.dto.BookingOrderDTO;
import com.example.YachtBookingBackEnd.dto.TransactionDTO;
import com.example.YachtBookingBackEnd.entity.Bill;
import com.example.YachtBookingBackEnd.entity.BookingOrder;
import com.example.YachtBookingBackEnd.entity.Transaction;
import com.example.YachtBookingBackEnd.mapper.BookingOrderMapper;
import com.example.YachtBookingBackEnd.mapper.TransactionMapper;
import com.example.YachtBookingBackEnd.repository.BillRepository;
import com.example.YachtBookingBackEnd.repository.BookingOrderRepository;
import com.example.YachtBookingBackEnd.repository.TransactionRepository;
import com.example.YachtBookingBackEnd.service.implement.IBill;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor // Tạo constructor (final)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j // Để sử dụng logging từ thư viện Lombok
public class BIllService implements IBill {
    BillRepository billRepository;
    BookingOrderRepository bookingOrderRepository;
    TransactionRepository transactionRepository;

    @Override
    @Transactional
    public List<BillDTO> getAllBillsByCustomer(String idCustomer) {
        List<BillDTO> billDTOList = new ArrayList<>();
        try {
            List<Bill> billList = billRepository.findByIDCustomer(idCustomer);
            if (billList == null || billList.isEmpty()) {
                log.error("Loi bill null");
                throw new RuntimeException("No bills found for customer ID: " + idCustomer);
            }

            for (Bill bill : billList) {
                Optional<BookingOrder> bookingOrderOpt = bookingOrderRepository.findById(bill.getBookingOrder().getIdBooking());
                Optional<Transaction> transactionOpt = transactionRepository.findById(bill.getTransaction().getIdTransaction());

                if (bookingOrderOpt.isPresent() && transactionOpt.isPresent()) {
                    BookingOrderDTO bookingOrderDTO = BookingOrderMapper.toDTO(bookingOrderOpt.get());
                    TransactionDTO transactionDTO = TransactionMapper.toDTO(transactionOpt.get());
                    BillDTO billDTO = new BillDTO(bookingOrderDTO, transactionDTO);
                    billDTOList.add(billDTO);
                } else  {
                    // Handle the case where either booking order or transaction is not found
                    if (bookingOrderOpt.isEmpty()) {
                        log.error("Booking order not found for ID: {}", bill.getBookingOrder().getIdBooking());
                    }
                    if (transactionOpt.isEmpty()) {
                        log.error("Transaction not found for ID: {}", bill.getTransaction().getIdTransaction());
                    }
                }
            }
        } catch (Exception e) {
            // Handle exceptions and log errors
            log.error("An error occurred while retrieving bills: {}", e.getMessage());
        }

        return billDTOList;
    }
}
