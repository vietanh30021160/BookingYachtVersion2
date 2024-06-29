package com.example.YachtBookingBackEnd.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BillDTO {
    BookingOrderDTO bookingOrderDTO;
    TransactionDTO transactionDTO;
}
