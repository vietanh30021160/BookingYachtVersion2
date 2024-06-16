package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.AccountDTO;
import com.example.YachtBookingBackEnd.dto.CompanyDTO;
import com.example.YachtBookingBackEnd.dto.FeedbackDTO;
import com.example.YachtBookingBackEnd.entity.*;
import com.example.YachtBookingBackEnd.repository.AccountRepository;
import com.example.YachtBookingBackEnd.repository.CompanyRepository;
import com.example.YachtBookingBackEnd.repository.FeedbackRepository;
import com.example.YachtBookingBackEnd.service.implement.ICompany;
import com.example.YachtBookingBackEnd.service.implement.IFile;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CompanyService implements ICompany {
    CompanyRepository companyRepository;
    AccountRepository accountRepository;
    IFile iFile;
    FeedbackRepository feedbackRepository;

    public static final String ROLE_COMPANY = "COMPANY";

    @Override
    public boolean addCompany(String idAccount, String name, String address, MultipartFile logo, String email) {
        try{
            if (name == null || name.isEmpty()) {
                log.error("Company name is empty");
                throw new IllegalArgumentException("Company name is empty");
            } else if (companyRepository.existsCompanyByName(name)) {
                log.error("Company already exists");
                throw new IllegalArgumentException("Company already exists");
            } else if (!isValidEmail(email)) {
                log.error("Invalid email format");
                throw new IllegalArgumentException("Invalid email format");
            }

            // Check if the account exists
            Account account = accountRepository.findById(idAccount)
                    .orElseThrow(() -> new IllegalArgumentException("Account does not exist"));
            if (!account.getRole().equals(ROLE_COMPANY)) {
                log.error("Account does not have role " + ROLE_COMPANY);
                throw new IllegalArgumentException("Account does not have role " + ROLE_COMPANY);
            }

            // Convert the request to Company entity
            Company company = new Company();
            company.setName(name);
            company.setAddress(address);
            iFile.save(logo);
            company.setLogo(logo.getOriginalFilename());
            company.setEmail(email);
            company.setExist(1);
            // Set the account for the company
            company.setAccount(account);

            // Save the company to the database
            companyRepository.save(company);

            return true;
        }catch (Exception e){
            log.error("Company could not be added", e);
            return false;
        }
    }

    @Override
    public boolean updateCompany(String idCompany, String name, String address, MultipartFile logo, String email) {

        Company company = companyRepository.findByIdAndExist(idCompany)
                .orElseThrow(() -> new RuntimeException("Company not found! Try again"));
        if(!isValidEmail(email)){
            log.error("Sai");
        }

        try {
            company.setName(name);
            company.setAddress(address);
            iFile.save(logo);
            company.setLogo(logo.getOriginalFilename());
            company.setEmail(email);
            companyRepository.save(company);
            return true;
        } catch (Exception e) {

            System.out.println(e);
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

    @Override
    public List<CompanyDTO> searchCompanyByName(String name) {
        List<Company> companies = companyRepository.findCompaniesByNameContaining(name);

        // Nếu không tìm thấy công ty nào, ném ra ngoại lệ với thông báo công ty không tồn tại
        if (companies.isEmpty()) {
            log.error("Company name does not match");
            throw new RuntimeException("Company name not found!");
        }

        List<CompanyDTO> companyDTOS = companies.stream().map(company -> {
            // Tạo AccountCompanyDTO từ Account
            Account account = company.getAccount();
            AccountDTO accountDTO = AccountDTO.builder()
                    .idAccount(account.getIdAccount())
                    .username(account.getUsername())
                    .password(account.getPassword())
                    .role(account.getRole())
                    .build();

            // Tạo CompanyDTO từ Company
            return CompanyDTO.builder()
                    .idCompany(company.getIdCompany())
                    .name(company.getName())
                    .address(company.getAddress())
                    .logo(company.getLogo())
                    .email(company.getEmail())
                    .exist(company.getExist())
                    .accountDTO(accountDTO)
                    .build();
        }).collect(Collectors.toList());

        return companyDTOS;
    }

    @Override
    public CompanyDTO getDetailCompanyByAccountID(String idAccoount) {
        Company company = companyRepository.findByIdAccountAndExist(idAccoount)
                .orElseThrow(() -> new RuntimeException("Company is hided!"));

        // Tạo CompanyDTO từ Company
        CompanyDTO companyDTO = CompanyDTO.builder()
                .idCompany(company.getIdCompany())
                .name(company.getName())
                .address(company.getAddress())
                .logo(company.getLogo())
                .email(company.getEmail())
                .exist(company.getExist())
                .build();

        return companyDTO;
    }

    public boolean hideCompany(String idCompany) {
        // Tìm công ty theo ID
        Company company = companyRepository.findByIdAndExist(idCompany)
                .orElseThrow(() -> new RuntimeException("Company not found! Try again"));

        // Cập nhật trạng thái của công ty thành ẩn (exist = 0)
        company.setExist(0);

        // Lưu thay đổi vào cơ sở dữ liệu
        companyRepository.save(company);

        return true;
    }


    @Override
    public List<FeedbackDTO> getFeedbacksByCompanyId(String idCompany) {
        List<FeedbackDTO> feedbackDTOList = new ArrayList<>();
        try {
            List<Feedback> feedbacks = companyRepository.findFeedbacksByCompanyId(idCompany);
            if(feedbacks != null){
                for (Feedback feedback : feedbacks) {
                    FeedbackDTO feedbackDTO = new FeedbackDTO();
                    feedbackDTO.setIdFeedback(feedback.getIdFeedback());
                    feedbackDTO.setStarRating(feedback.getStarRating());
                    feedbackDTO.setDescription(feedback.getDescription());
                    feedbackDTO.setIdBooking(feedback.getIdBooking());

                    Customer customer = new Customer();
                    customer.setIdCustomer(feedback.getCustomer().getIdCustomer());
                    customer.setFullName(feedback.getCustomer().getFullName());
                    customer.setEmail(feedback.getCustomer().getEmail());
                    customer.setPhoneNumber(feedback.getCustomer().getPhoneNumber());
                    customer.setAddress(feedback.getCustomer().getAddress());


                    feedbackDTO.setCustomer(customer);
                    feedbackDTO.setIdYacht(feedback.getYacht().getIdYacht());


                    feedbackDTOList.add(feedbackDTO);

                }
            }

        }catch (Exception e){
            System.out.println("Exception: " + e.getMessage());
        }
        return feedbackDTOList;
    }
}
