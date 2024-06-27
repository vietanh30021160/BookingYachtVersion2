package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.BookingOrderDTO;
import com.example.YachtBookingBackEnd.entity.Bill;
import com.example.YachtBookingBackEnd.entity.BookingOrder;
import com.example.YachtBookingBackEnd.entity.Company;
import com.example.YachtBookingBackEnd.mapper.BookingOrderMapper;
import com.example.YachtBookingBackEnd.repository.BillRepository;
import com.example.YachtBookingBackEnd.repository.BookingOrderRepository;
import com.example.YachtBookingBackEnd.repository.CompanyRepository;
import com.example.YachtBookingBackEnd.service.implement.IBookingOrder;
import com.example.YachtBookingBackEnd.service.implement.IMailSender;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // Tạo constructor (final)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j // Để sử dụng logging từ thư viện Lombok
public class BookingOrderService implements IBookingOrder {
    BookingOrderRepository bookingOrderRepository;
    IMailSender mailSender;
    CompanyRepository companyRepository;
    BillRepository billRepository;

    public static final String DEFAULT_STATUS = "Pending";

    @Override
    // Sử dụng @Transactional để giữ phiên Hibernate mở trong suốt quá trình xử lý
    @Transactional(readOnly = true)
    public List<BookingOrderDTO> getAllBookingsByCompanyId(String idCompany) {
        List<BookingOrder> bookingOrderList = bookingOrderRepository.findBookingOrdersByCompany(idCompany);
        return bookingOrderList.stream()
                .map(BookingOrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<BookingOrderDTO> getBookingOrderByPrice(String idCompany, Long min, Long max) {
        List<BookingOrder> bookingOrderList = bookingOrderRepository.findPriceByRange(idCompany, min, max);
        return bookingOrderList.stream()
                .map(BookingOrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<BookingOrderDTO> getBookingByCustomerID(String idCustomer) {
        List<BookingOrder> bookingOrderList = bookingOrderRepository.findBookingOrdersByCustomer(idCustomer);
        return bookingOrderList.stream()
                .map(BookingOrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public boolean confirmBooking(String idBookingOrder, String idCompany) {
        Optional<BookingOrder> bookingOrder = bookingOrderRepository.findById(idBookingOrder);
        try {
            if (bookingOrder.isPresent() && bookingOrder.get().getStatus().equals(DEFAULT_STATUS)) {
                bookingOrder.get().setStatus("Confirmed");
                bookingOrderRepository.save(bookingOrder.get());

                Bill bill = new Bill();
                bill.setBookingOrder(bookingOrder.get());
                bill.setTransaction(bookingOrder.get().getTransaction());
                billRepository.save(bill);

                // Send cancellation email
                String customerEmail = bookingOrder.get().getCustomer().getEmail();
                Company company = companyRepository.findByIdAndExist(idCompany)
                        .orElseThrow(() -> new RuntimeException("Company not found! Try again"));
                String companyName = company.getName();
                mailSender.senConfirmMail(customerEmail, idBookingOrder, companyName);

                return true;
            }
        } catch (Exception e) {
            log.error("Confirm Booking failed", e);
        }
        return false;
    }

    @Override
    @Transactional
    public boolean cancelBooking(String idBookingOrder, String reason, String idCompany) {
        Optional<BookingOrder> bookingOrderOptional = bookingOrderRepository.findById(idBookingOrder);

        if (bookingOrderOptional.isPresent()) {
            log.info("Booking order is present");
            BookingOrder bookingOrder = bookingOrderOptional.get();
            boolean isPending = DEFAULT_STATUS.equals(bookingOrder.getStatus());
            boolean isTransactionFailed = bookingOrder.getTransaction() != null
                    && "Failure".equals(bookingOrder.getTransaction().getStatus());

            log.info("isPending: {}", isPending);
            log.info("isTransactionFailed: {}", isTransactionFailed);

            if (isPending && isTransactionFailed) {
                log.info("start if and change status inn bookingOrder table ");
                try {
                    bookingOrder.setStatus("Cancelled");
                    bookingOrder.setReason(reason);
                    bookingOrderRepository.save(bookingOrder);

                    // Send cancellation email
                    String customerEmail = bookingOrder.getCustomer().getEmail();
                    Company company = companyRepository.findByIdAndExist(idCompany)
                            .orElseThrow(() -> new RuntimeException("Company not found! Try again"));
                    String companyName = company.getName();
                    mailSender.sendCancelMail(customerEmail, idBookingOrder, reason, companyName);

                    return true;
                } catch (Exception e) {
                    log.error("Cancel Booking failed", e);
                }
            } else {
                log.error("Conditions for cancellation not met");
            }
        } else {
            log.error("Booking Order not present");
        }

        return false;
    }

    @Override
    @Transactional
    public void autoConfirmAndCancelBookings() {
        LocalDateTime now = LocalDateTime.now();
        List<BookingOrder> pendingOrders = bookingOrderRepository.findAllByStatus(DEFAULT_STATUS);

        for (BookingOrder bookingOrder : pendingOrders) {
            LocalDateTime bookingTime = bookingOrder.getBookingTime();
            boolean isOverdue = bookingTime.isAfter(bookingTime.plusHours(24));
            boolean isTransactionSuccess = bookingOrder.getTransaction() != null
                    && "Success".equals(bookingOrder.getTransaction().getStatus());
            boolean isTransactionFailed = bookingOrder.getTransaction() != null
                    && "Failure".equals(bookingOrder.getTransaction().getStatus());
            if (isTransactionSuccess && isOverdue) {
                bookingOrder.setStatus("Confirmed");
                bookingOrderRepository.save(bookingOrder);

                // Send confirm email
                String customerEmail = bookingOrder.getCustomer().getEmail();
                mailSender.senConfirmMail(customerEmail, bookingOrder.getIdBooking(), "Booking System");
            } else if (isTransactionFailed && isOverdue) {
                bookingOrder.setStatus("Cancelled");
                String reason = "Transaction failed after 24 hours";
                bookingOrder.setReason(reason);
                bookingOrderRepository.save(bookingOrder);

                // Send cancel email
                String customerEmail = bookingOrder.getCustomer().getEmail();
                mailSender.sendCancelMail(customerEmail, bookingOrder.getIdBooking(), reason, "Booking System");
            }
        }
    }


}
