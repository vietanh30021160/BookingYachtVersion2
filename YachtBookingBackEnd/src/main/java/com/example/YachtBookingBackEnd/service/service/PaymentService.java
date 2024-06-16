package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.PaymentDTO;
import com.example.YachtBookingBackEnd.entity.*;
import com.example.YachtBookingBackEnd.repository.BookingOrderRepository;
import com.example.YachtBookingBackEnd.repository.RoomRepository;
import com.example.YachtBookingBackEnd.repository.ServiceRepository;
import com.example.YachtBookingBackEnd.repository.TransactionRepository;
import com.example.YachtBookingBackEnd.security.payment.VNPAYConfig;
import com.example.YachtBookingBackEnd.service.implement.IBookingRoom;
import com.example.YachtBookingBackEnd.service.implement.IBookingService;
import com.example.YachtBookingBackEnd.service.implement.IPayment;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PaymentService implements IPayment {
    VNPAYConfig vnpayConfig;
    BookingOrderRepository bookingOrderRepository;
    TransactionRepository transactionRepository;
    RoomRepository roomRepository;
    ServiceRepository serviceRepository;
    IBookingService iBookingService;
    IBookingRoom iBookingRoom;

    /**
     * Tạo yêu cầu thanh toán qua VNPAY
     * @param selectedRoomIds Danh sách ID phòng đã chọn
     * @param selectedServiceIds Danh sách ID dịch vụ đã chọn
     * @param requirement Yêu cầu đặc biệt
     * @param bankCode Mã ngân hàng
     * @param request Yêu cầu HTTP
     * @return URL thanh toán của VNPAY
     */
    @Override
    public String createVnPayPayment(List<String> selectedRoomIds, List<String> selectedServiceIds, String requirement, String bankCode, HttpServletRequest request) {

        // Tạo đơn đặt phòng mới
        BookingOrder bookingOrder = new BookingOrder();
        bookingOrder.setBookingTime(LocalDateTime.now());
        bookingOrder.setRequirement(requirement);
        bookingOrder.setStatus("Pending");

        // Lấy danh sách các phòng đã chọn từ RoomRepository
        List<Room> selectedRooms = roomRepository.findAllById(selectedRoomIds);
        bookingOrder.setBookingRoomSet(iBookingRoom.createBookingRooms(selectedRooms, bookingOrder));

        // Lấy danh sách các dịch vụ đã chọn từ ServiceRepository
        List<com.example.YachtBookingBackEnd.entity.Service> selectedServices = serviceRepository.findAllById(selectedServiceIds);
        bookingOrder.setBookingServiceSet(iBookingService.createBookingServices(selectedServices, bookingOrder));

        calculateTotalAmount(bookingOrder);

        // Tạo mã tham chiếu duy nhất cho giao dịch thanh toán
        String vnp_TxnRef = vnpayConfig.getRandomNumber(8);
        bookingOrder.setTxnRef(vnp_TxnRef);
        bookingOrderRepository.save(bookingOrder);


        //Tạo URL Thanh toán
        String vnp_IpAddr = vnpayConfig.getIpAddress(request);

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnpayConfig.vnp_Version);
        vnp_Params.put("vnp_Command", vnpayConfig.vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnpayConfig.vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(bookingOrder.getAmount()*100)); //Số tiền cần thanh toán nhân với 100 để triệt tiêu phần thập phân trước khi gửi sang VNPAY
        vnp_Params.put("vnp_CurrCode", "VND");

        if (bankCode != null && !bankCode.isEmpty()) {
            vnp_Params.put("vnp_BankCode", bankCode);
        }

        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", vnpayConfig.vnp_OrderType);

        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", vnpayConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        // Sắp xếp các tham số và tạo dữ liệu hash và query
        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = vnp_Params.get(fieldName);
            if ((fieldValue != null) && (!fieldValue.isEmpty())) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = vnpayConfig.hmacSHA512(vnpayConfig.vnp_SecretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;

        return vnpayConfig.vnp_PayUrl + "?" + queryUrl;
    }

    /**
     * Tính toán tổng số tiền cần thanh toán cho đơn đặt phòng
     * @param bookingOrder Đơn đặt phòng cần tính toán
     */
    private void calculateTotalAmount(BookingOrder bookingOrder) {
        long totalAmount = 0;

        for (BookingRoom bookingRoom : bookingOrder.getBookingRoomSet()) {
            totalAmount += bookingRoom.getRoom().getRoomType().getPrice();
        }

        for (BookingService bookingService : bookingOrder.getBookingServiceSet()) {
            totalAmount += bookingService.getService().getPrice();
        }

        bookingOrder.setAmount(totalAmount);
    }


    /**
     * Xử lý callback từ VNPAY sau khi người dùng thanh toán
     * @param response Phản hồi HTTP
     * @param request Yêu cầu HTTP
     * @return Đối tượng PaymentDTO chứa thông tin phản hồi
     */
    @Override
    public PaymentDTO paymentCallbackHandler(HttpServletResponse response, HttpServletRequest request) {

        // get params from vnpay
        // response.sendRedirect("link-frontend")  //redirect to frontend link => if response code = 00 => transaction success
        // => in FE call api confirm booking api => save booking info to database

        PaymentDTO paymentDTO =new PaymentDTO();

        try {
            // Lấy thông tin từ request callback
            String sender = request.getParameter("vnp_BankTranNo");
            String vnpTxnRef = request.getParameter("vnp_TxnRef");
            String vnpResponseCode = request.getParameter("vnp_ResponseCode");
            String vnpTransactionNo = request.getParameter("vnp_TransactionNo");
            long vnpAmount = Long.parseLong(request.getParameter("vnp_Amount")) / 100; // VNPAY trả về số tiền nhân với 100
            LocalDateTime vnpPayDate = LocalDateTime.parse(request.getParameter("vnp_PayDate"));

            BookingOrder bookingOrder = bookingOrderRepository.findByTxnRef(vnpTxnRef);
            if (bookingOrder != null && bookingOrder.getStatus().equals("Confirmed")) {
                if (vnpResponseCode.equals("00")) {
                    // Giao dịch thành công
                    Transaction transaction = new Transaction();
                    transaction.setIdTransaction(vnpTransactionNo);
                    transaction.setAmount(vnpAmount);
                    transaction.setTransactionDate(vnpPayDate);
                    transaction.setStatus("Success");
                    transaction.setReceiverBankTranNo("Receiver_Id");
                    transaction.setSenderBankTranNo(sender);
                    transaction.setBookingOrder(bookingOrder);

                    transactionRepository.save(transaction);

                    // Cập nhật trạng thái đặt phòng
                    bookingOrder.setStatus("Paid");
                    bookingOrderRepository.save(bookingOrder);

                    paymentDTO.setCode("00");
                    paymentDTO.setMessage("Giao dịch thành công");

                    response.sendRedirect("http://frontend-code.com/success");  //frontend thiết kế giao diện Giao dịch thất bại
                } else  {
                    // Giao dịch thất bại
                    bookingOrder.setStatus("Failed");
                    bookingOrderRepository.save(bookingOrder);

                    paymentDTO.setCode("99");
                    paymentDTO.setMessage("Giao dịch thất bại");

                    response.sendRedirect("http://frontend-code.com/failure"); //frontend thiết kế giao diện Giao dịch thất bại
                }
            } else  {
                paymentDTO.setCode("01");
                paymentDTO.setMessage("Không tìm thấy đơn đặt phòng");

                response.sendRedirect("http://frontend-code.com/failure");
            }
        } catch (IOException e) {
            log.error("Lỗi xử lý callback thanh toán: ", e);
            paymentDTO.setCode("98");
            paymentDTO.setMessage("Lỗi xử lý callback");
        } catch (NumberFormatException e) {
            log.error("Lỗi parse số tiền từ VnPay: ", e);
            paymentDTO.setCode("98");
            paymentDTO.setMessage("Lỗi xử lý số tiền từ VnPay");
        } catch (DateTimeParseException e) {
            log.error("Lỗi parse ngày giờ từ VnPay: ", e);
            paymentDTO.setCode("98");
            paymentDTO.setMessage("Lỗi xử lý ngày giờ từ VnPay");
        }

        return paymentDTO;
    }

    @Override
    public boolean confirmBooking(String idBookingOrder) {
        Optional<BookingOrder> bookingOrder = bookingOrderRepository.findById(idBookingOrder);
        try {
            if (bookingOrder.isPresent()) {
                bookingOrder.get().setStatus("Confirmed");
                bookingOrderRepository.save(bookingOrder.get());
            }
            return true;
        } catch (Exception e) {
            log.error("Confirm Booking failed", e);
            return false;
        }
    }

    @Override
    public boolean cancelBooking(String idBookingOrder) {
        Optional<BookingOrder> bookingOrder = bookingOrderRepository.findById(idBookingOrder);
        try {
            if (bookingOrder.isPresent()) {
                bookingOrder.get().setStatus("Cancelled");
                bookingOrderRepository.save(bookingOrder.get());
            }
            return true;
        } catch (Exception e) {
            log.error("Cancel Booking failed", e);
            return false;
        }
    }
}
