package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.AccountDTO;
import com.example.YachtBookingBackEnd.entity.Account;
import com.example.YachtBookingBackEnd.entity.Company;
import com.example.YachtBookingBackEnd.repository.AccountRepository;
import com.example.YachtBookingBackEnd.repository.CompanyRepository;
import com.example.YachtBookingBackEnd.service.implement.IAccount;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor // Tạo constructor (final)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j // Để sử dụng logging từ thư viện Lombok
public class AccountService implements IAccount {
    AccountRepository accountRepository;
    PasswordEncoder passwordEncoder;
    CompanyRepository companyRepository;

    public static final String ROLE_COMPANY = "COMPANY";
    public static final String ROLE_CUSTOMER = "CUSTOMER";

    @Override
    public boolean createAccountCompany(String username, String password) {
        try {
            // Kiểm tra xem username đã tồn tại hay chưa
            if (accountRepository.existsByUsername(username)) {
                // Nếu tồn tại, throw exception với thông báo username đã tồn tại
                throw new Exception("Username already exists");
            }

            // Chuyển đổi đối tượng request thành đối tượng Account
            Account account = new Account();
            account.setUsername(username);
            account.setPassword(passwordEncoder.encode(password));
            account.setRole(ROLE_COMPANY);

            // Lưu account vào db
            accountRepository.save(account);

            //Thêm thông tin của công ty
            Company company = new Company();
            company.setName("company");
            company.setAddress("address");
            company.setEmail(generateRandomEmail());
            company.setExist(1);
            company.setAccount(account);

            companyRepository.save(company);

            return true;
        } catch (Exception e) {
            log.error("Account company creation failed - default error", e);
            return false;
        }
    }

    private String generateRandomEmail() {
        Random random = new Random();
        int randomNumber = random.nextInt(10000);
        return "email" + randomNumber + "@gmail.com";
    }

    @Override
    public List<AccountDTO> getAllAccountCompanies() {
        // Lấy tất cả các tài khoản từ cơ sở dữ liệu và chuyển đổi mỗi đối tượng Account thành AccountCompanyDTO
        return accountRepository.findAll().stream()
                .filter(account -> ROLE_COMPANY.equals(account.getRole()))
                .map(account -> AccountDTO.builder()
                        .idAccount(account.getIdAccount())
                        .username(account.getUsername())
                        .password(account.getPassword())
                        .role(account.getRole())
                        .build())
                .toList();
    }

    @Override
    public String createAccountCustomer(String username, String password) {
        try {
            // Kiểm tra xem username đã tồn tại hay chưa
            if (accountRepository.existsByUsername(username)) {
                // Nếu tồn tại, throw exception với thông báo username đã tồn tại
                throw new Exception("Username already exists");
            }

            // Chuyển đổi đối tượng request thành đối tượng Account
            Account account = new Account();
            account.setUsername(username);
            account.setPassword(passwordEncoder.encode(password));
            account.setRole(ROLE_CUSTOMER);

            // Lưu account vào db
            accountRepository.save(account);

            return account.getIdAccount();
        } catch (Exception e) {
            log.error("Account customer creation failed - default error", e);
            return "Account customer creation failed";
        }
    }

}

