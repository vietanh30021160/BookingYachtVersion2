package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.entity.Account;
import com.example.YachtBookingBackEnd.entity.Customer;
import com.example.YachtBookingBackEnd.entity.Wallet;
import com.example.YachtBookingBackEnd.repository.AccountRepository;
import com.example.YachtBookingBackEnd.repository.CustomerRepository;
import com.example.YachtBookingBackEnd.repository.WalletRepository;
import com.example.YachtBookingBackEnd.service.implement.ICustomer;
import com.example.YachtBookingBackEnd.service.implement.IWallet;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CustomerService implements ICustomer {
    CustomerRepository customerRepository;
    AccountRepository accountRepository;
    WalletRepository walletRepository;
    IWallet iWallet;

    public static final String ROLE_CUSTOMER = "CUSTOMER";

    @Override
    public boolean addCustomer(String idAccount, String fullName, String email, String phoneNumber, String address) {
        try {
            if (!isValidEmail(email)) {
                log.error("Invalid email format");
                throw new IllegalArgumentException("Invalid email format");
            }
            if (!isValidPhoneNumber(phoneNumber)) {
                log.error("Invalid phone number format");
                throw new IllegalArgumentException("Invalid phone number format");
            }

            // Check if the account exists
            Account account = accountRepository.findById(idAccount)
                    .orElseThrow(() -> new IllegalArgumentException("Account does not exist"));
            if (!account.getRole().equals(ROLE_CUSTOMER)) {
                log.error("Account does not have role " + ROLE_CUSTOMER);
                throw new IllegalArgumentException("Account does not have role " + ROLE_CUSTOMER);
            }

            Customer customer = new Customer();
            customer.setFullName(fullName);
            customer.setEmail(email);
            customer.setPhoneNumber(phoneNumber);
            customer.setAddress(address);
            customer.setAccount(account);
            customerRepository.save(customer);

            // Gọi API VNPay để tạo ví
            String vnpayWalletId = iWallet.createVnpayWallet(customer);

            Wallet wallet = new Wallet();
            wallet.setName(fullName);
            wallet.setBankNumber(vnpayWalletId); // Đây là ID ví VNPay, không phải số tài khoản ngân hàng
            wallet.setBalance(0);
            walletRepository.save(wallet);

            customer.setWallet(wallet);
            customerRepository.save(customer);

            return true;
        } catch (Exception e) {
            log.error("Error occurred while adding customer: {}", e.getMessage());
            return false;
        }
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        if (email == null) {
            return false;
        }
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public static boolean isValidPhoneNumber(String phoneNumber) {
        String phoneNumberRegex = "^0[0-9]{9}$";
        Pattern pattern = Pattern.compile(phoneNumberRegex);
        if (phoneNumber == null) {
            return false;
        }
        Matcher matcher = pattern.matcher(phoneNumber);
        return matcher.matches();
    }
}
