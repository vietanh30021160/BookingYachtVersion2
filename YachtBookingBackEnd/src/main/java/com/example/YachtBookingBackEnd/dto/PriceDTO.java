package com.example.YachtBookingBackEnd.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PriceDTO {
    private long lowestPrice, highestPrice;
}
