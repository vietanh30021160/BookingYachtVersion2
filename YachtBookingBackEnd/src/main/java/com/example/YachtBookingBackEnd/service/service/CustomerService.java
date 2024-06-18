package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.AccountDTO;
import com.example.YachtBookingBackEnd.dto.CustomerDTO;
import com.example.YachtBookingBackEnd.dto.FeedbackDTO;
import com.example.YachtBookingBackEnd.entity.*;
import com.example.YachtBookingBackEnd.repository.*;
import com.example.YachtBookingBackEnd.service.implement.ICustomer;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CustomerService implements ICustomer {
    CustomerRepository customerRepository;
    AccountRepository accountRepository;
    FeedbackRepository feedbackRepository;
    BookingOrderRepository bookingOrderRepository;
    BillRepository billRepository;
    YachtRepository yachtRepository;

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
            return true;
        } catch (Exception e) {
            log.error("Error occurred while adding customer: {}", e.getMessage());
            return false;
        }
    }

    @Override
    public List<CustomerDTO> getAllCustomer() {
        List<CustomerDTO> customerDTOList = new ArrayList<>();

        try {
            List<Customer> customerList = customerRepository.findAll();

            for (Customer customer : customerList) {
                CustomerDTO customerDTO = new CustomerDTO();
                AccountDTO accountDTO = new AccountDTO();

                if(customer.getAccount().getRole().equals("CUSTOMER")){
                    accountDTO.setRole(customer.getAccount().getRole());
                    accountDTO.setIdAccount(customer.getAccount().getIdAccount());
                    accountDTO.setUsername(customer.getAccount().getUsername());
                    accountDTO.setPassword(customer.getAccount().getPassword());



                    customerDTO.setIdCustomer(customer.getIdCustomer());
                    customerDTO.setFullName(customer.getFullName());
                    customerDTO.setEmail(customer.getEmail());
                    customerDTO.setPhone(customer.getPhoneNumber());
                    customerDTO.setAccountDTO(accountDTO);
                    customerDTO.setAddress(customer.getAddress());
                    customerDTOList.add(customerDTO);
                }


            }
        } catch (Exception e) {
            System.out.println("Exception: " + e.getMessage());
        }
        System.out.println(customerDTOList);

        return customerDTOList;
    }

    @Override
    public CustomerDTO getCustomer(String id) {
        Optional<Customer> customer = customerRepository.findById(id);
        AccountDTO accountDTO = new AccountDTO();
        CustomerDTO customerDTO = new CustomerDTO();
        if (customer.isPresent()) {
            customerDTO.setIdCustomer(id);
            customerDTO.setFullName(customer.get().getFullName());
            customerDTO.setEmail(customer.get().getEmail());
            customerDTO.setPhone(customer.get().getPhoneNumber());
            customerDTO.setAddress(customer.get().getAddress());

            accountDTO.setIdAccount(customer.get().getAccount().getIdAccount());
            accountDTO.setUsername(customer.get().getAccount().getUsername());
            accountDTO.setPassword(customer.get().getAccount().getPassword());
            accountDTO.setPassword(customer.get().getAccount().getRole());

            customerDTO.setAccountDTO(accountDTO);
        }
        return customerDTO;
    }

    @Override
    public CustomerDTO findCustomerByUsername(String username) {
        Account account = accountRepository.findAccountByUsername(username);

        Customer customer = customerRepository.findCustomerByAccount(account);

        if (account.getRole().equals("CUSTOMER")) {
            AccountDTO accountDTO = new AccountDTO();
            CustomerDTO customerDTO = new CustomerDTO();

            customerDTO.setIdCustomer(customer.getIdCustomer());
            customerDTO.setFullName(customer.getFullName());
            customerDTO.setEmail(customer.getEmail());
            customerDTO.setPhone(customer.getPhoneNumber());
            customerDTO.setAddress(customer.getAddress());
            accountDTO.setIdAccount(account.getIdAccount());
            accountDTO.setUsername(username);
            accountDTO.setPassword(account.getPassword());
            accountDTO.setRole(account.getRole());
            customerDTO.setAccountDTO(accountDTO);
            return customerDTO;
        }
        return null;

    }

    @Override
    public boolean updateCustomer(String customerId, String fullName, String email, String phone, String address) {
        //System.out.println(customerId);
        Optional<Customer> customer = customerRepository.findById(customerId);
        System.out.println(customer);
        if (customer.isPresent()) {
            Customer customerEntity = customer.get();
            System.out.println(customerEntity);
            try {

                customerEntity.setFullName(fullName);

                customerEntity.setEmail(email);

                customerEntity.setPhoneNumber(phone);
                customerEntity.setAddress(address);

                customerRepository.save(customerEntity);
                return true;

            } catch (Exception e) {
                return false;
            }
        } else {
            return false;
        }

    }

    @Override
    public boolean addFeedback(int starRating, String description, String idBooking, String idCustomer, String idYacht) {
        try{
            // Kiểm tra xem khách hàng đã đặt thuyền này chưa
            List<Yacht> yachts = yachtRepository.findYachtsByCustomerAndBooking(idCustomer, idBooking);
            boolean yachtBooked = yachts.stream().anyMatch(yacht -> yacht.getIdYacht().equals(idYacht));

            if(!yachtBooked){
                throw new RuntimeException("Customer has not booked this yacht");
            }
            // Kiểm tra xem đơn đặt phòng có tồn tại, đã hoàn thành và thuộc về khách hàng hay không
            BookingOrder bookingOrder = bookingOrderRepository.findByIdAndCustomerIdAndStatus(idBooking, idCustomer)
                    .orElseThrow(() -> new RuntimeException("Booking not found or not completed or does not belong to the customer"));

            // Kiểm tra xem đơn đặt phòng có hóa đơn không
            if(!billRepository.existsByBookingOrder_IdBooking(idBooking)){
                throw new RuntimeException("Bill does not exist for this booking");
            }
            Feedback feedback = new Feedback();
            feedback.setStarRating(starRating);
            feedback.setDescription(description);
            feedback.setIdBooking(idBooking);
            Customer customer = new Customer();
            customer.setIdCustomer(idCustomer);
            feedback.setCustomer(customer);
            Yacht yacht = new Yacht();
            yacht.setIdYacht(idYacht);
            feedback.setYacht(yacht);

            feedbackRepository.save(feedback);
            return true;
        }catch (Exception e){
            System.out.println("Error: " + e.getMessage());
            return false;
        }
    }

    @Override
    public List<FeedbackDTO> getFeedbackByYachtId(String yachtId) {
        List<FeedbackDTO> feedbackDTOList = new ArrayList<>();
        try {
            List<Feedback> feedbacks = feedbackRepository.findByYachtIdYacht(yachtId);
            if (feedbacks != null) {
                for (Feedback feedback : feedbacks) {
                    FeedbackDTO feedbackDTO = new FeedbackDTO();
                    feedbackDTO.setIdFeedback(feedback.getIdFeedback());
                    feedbackDTO.setStarRating(feedback.getStarRating());
                    feedbackDTO.setDescription(feedback.getDescription());
                    feedbackDTO.setIdBooking(feedback.getIdBooking());
                    Customer customer = new Customer();
                    customer.setIdCustomer(feedback.getCustomer().getIdCustomer());
                    customer.setFullName(feedback.getCustomer().getFullName());
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
