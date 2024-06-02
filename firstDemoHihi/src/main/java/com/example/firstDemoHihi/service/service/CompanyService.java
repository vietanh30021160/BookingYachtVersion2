package com.example.firstDemoHihi.service.service;

import com.example.firstDemoHihi.dto.AccountDTO;
import com.example.firstDemoHihi.dto.CompanyDTO;
import com.example.firstDemoHihi.entity.Account;
import com.example.firstDemoHihi.entity.Company;
import com.example.firstDemoHihi.payload.request.CompanyCreateRequest;
import com.example.firstDemoHihi.repository.AccountRepository;
import com.example.firstDemoHihi.repository.CompanyRepository;
import com.example.firstDemoHihi.service.implement.ICompany;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CompanyService implements ICompany {
    CompanyRepository companyRepository;
    AccountRepository accountRepository;

    public static final String ROLE_COMPANY = "COMPANY";

    @Override
    public CompanyDTO addCompany(CompanyCreateRequest request) {
        if (request.getName() == null || request.getName().isEmpty()) {
            log.error("Company name is empty");
            throw new IllegalArgumentException("Company name is empty");
        } else if (companyRepository.existsCompanyByName(request.getName())) {
            log.error("Company already exists");
            throw new IllegalArgumentException("Company already exists");
        }

        // Check if the account exists
        Account account = accountRepository.findById(request.getIdAccount())
                .orElseThrow(() -> new IllegalArgumentException("Account does not exist"));
        if (!account.getRole().equals(ROLE_COMPANY)) {
            log.error("Account does not have role " + ROLE_COMPANY);
            throw new IllegalArgumentException("Account does not have role " + ROLE_COMPANY);
        }

        // Convert the request to Company entity
        Company company = new Company();
        company.setName(request.getName());
        company.setAddress(request.getAddress());
        company.setLogo(request.getLogo());
        company.setEmail(request.getEmail());
        company.setExist(1);
        // Set the account for the company
        company.setAccount(account);

        // Save the company to the database
        Company savedCompany = companyRepository.save(company);

        // Convert the saved company to CompanyDTO and return
        return CompanyDTO.builder()
                .idCompany(savedCompany.getIdCompany())
                .name(savedCompany.getName())
                .address(savedCompany.getAddress())
                .logo(savedCompany.getLogo())
                .email(savedCompany.getEmail())
                .exist(savedCompany.getExist())
                .build();

    }

    @Override
    public CompanyDTO searchCompanyByName(String name) {
        // Nếu không tìm thấy công ty nào, ném ra ngoại lệ với thông báo công ty không tồn tại
        Company company = companyRepository.findCompanyByName(name)
                .orElseThrow(() -> new RuntimeException("Company not found!"));

        // Tạo AccountCompanyDTO từ Account
        Account account = company.getAccount();
        AccountDTO accountDTO = AccountDTO.builder()
                .idAccount(account.getIdAccount())
                .username(account.getUsername())
                .password(account.getPassword())
                .role(account.getRole())
                .build();

        // Tạo CompanyDTO từ Company
        CompanyDTO companyDTO = CompanyDTO.builder()
                .idCompany(company.getIdCompany())
                .name(company.getName())
                .address(company.getAddress())
                .logo(company.getLogo())
                .email(company.getEmail())
                .exist(company.getExist())
                .accountDTO(accountDTO)
                .build();

        return companyDTO;
    }


}
