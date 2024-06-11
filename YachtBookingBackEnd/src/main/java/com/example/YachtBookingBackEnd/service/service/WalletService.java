package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.entity.Customer;
import com.example.YachtBookingBackEnd.service.implement.IWallet;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class WalletService implements IWallet {
    @NonFinal
    @Value("${vnpay.api.url}")
    protected String VNPAY_API_URL;

    @NonFinal
    @Value("${vnpay.api.secret-key}")
    protected String VNPAY_API_SECRET_KEY;

    @NonFinal
    @Value("${vnpay.api.access-key}")
    protected String VNPAY_API_ACCESS_KEY;

    @Override
    public String createVnpayWallet(Customer customer) {
        return "";
    }
}
