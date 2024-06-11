package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.AccountDTO;
import com.example.YachtBookingBackEnd.entity.Account;
import com.example.YachtBookingBackEnd.payload.request.AccountCompanyCreationRequest;
import com.example.YachtBookingBackEnd.repository.AccountRepository;
import com.example.YachtBookingBackEnd.service.implement.IAccount;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor // Tạo constructor (final)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j // Để sử dụng logging từ thư viện Lombok
public class AccountService implements IAccount {
    AccountRepository accountRepository;
    PasswordEncoder passwordEncoder;

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

            return true;
        } catch (Exception e) {
            log.error("Account company creation failed - default error", e);
            return false;
        }
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


    @Override
    public List<AccountDTO> getAccountCustomer() {
        List<AccountDTO> accountDTOList = new ArrayList<>();

        try {
            List<Account> accountList = accountRepository.findAll();

            for (Account account : accountList
            ) {

                AccountDTO accountDTO = new AccountDTO();

                accountDTO.setIdAccount(account.getIdAccount());
                accountDTO.setUsername(account.getUsername());
                accountDTO.setPassword(account.getPassword());
                accountDTO.setRole(account.getRole());
                String role = account.getRole();
                if (role.equals("CUSTOMER")) {
                    accountDTOList.add(accountDTO);
                }
                System.out.println(account);
            }
        } catch (Exception e) {
            System.out.println("Exception: " + e.getMessage());
        }


        return accountDTOList;
    }

    @Override
    public AccountDTO get1Account(String  id)  {
        Optional<Account> account=  accountRepository.findById(id);

        AccountDTO accountDTO = new AccountDTO();
        if(account.isPresent()){
            accountDTO.setIdAccount(id);
            accountDTO.setUsername(account.get().getUsername());
            accountDTO.setPassword(account.get().getPassword());
            accountDTO.setRole(account.get().getRole());
        }
        return accountDTO;
    }

    @Override
    public void deleteAccount(String id){
        accountRepository.deleteById(id);
    }
    public Account getAccount2(String id){
        return accountRepository.findById(id)
                . orElseThrow(() -> new RuntimeException("Can not found id: " + id));
    }

    @Override
    public boolean updateAccount(String customerId, String  password) {

        Optional<Account> account = accountRepository.findById(customerId);
        if (account.isPresent()) {
            Account account1 = account.get();
            try {
                account1.setPassword(passwordEncoder.encode(password));
                accountRepository.save(account.get());
                return true;
            }catch (Exception e){
                return false;
            }
        }else{
            return false;
        }

    }

}

