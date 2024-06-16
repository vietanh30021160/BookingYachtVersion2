package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.entity.Customer;
import com.example.YachtBookingBackEnd.service.implement.IWallet;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class WalletService implements IWallet {
//    @NonFinal
//    @Value("${vnpay.api.url}")
//    protected String VNPAY_API_URL;
//
//    @NonFinal
//    @Value("${vnpay.api.secret-key}")
//    protected String VNPAY_API_SECRET_KEY;
//
//    @NonFinal
//    @Value("${vnpay.api.access-key}")
//    protected String VNPAY_API_ACCESS_KEY;
//
//    public final RestTemplate restTemplate;
//
//    @Override
//    public String createVnpayWallet(Customer customer) {
//        // URL endpoint để tạo ví
//        String url = VNPAY_API_URL;
//
//        // Thiết lập header cho yêu cầu HTTP
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        // Tạo chuỗi chữ ký (signature) dựa trên secret-key và các thông tin khác
//        String signature = createSignature(customer.getAccount().getUsername());
//
//        // Tạo request body với các tham số cần thiết
//        Map<String, Object> requestBody = new HashMap<>();
//        requestBody.put("access_key", VNPAY_API_ACCESS_KEY);
//        requestBody.put("secret_key", VNPAY_API_SECRET_KEY); // Sửa lại: phải là VNPAY_API_SECRET_KEY
//        requestBody.put("username", customer.getAccount().getUsername());
//        requestBody.put("signature", signature);
//
//        // Tạo HttpEntity chứa request body và header
//        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
//
//        try {
//            // Gửi yêu cầu POST tới API VNPay và nhận phản hồi
//            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
//
//            // Kiểm tra trạng thái phản hồi và trả về wallet_id nếu yêu cầu thành công
//            if (response.getStatusCode() == HttpStatus.OK) {
//                Map<String, Object> responseBody = response.getBody();
//                if (responseBody != null) {
//                    return (String) responseBody.get("wallet_id");
//                }
//            }
//        } catch (HttpClientErrorException e) {
//            // Ghi log và xử lý ngoại lệ khi gặp lỗi HTTP
//            log.error("HTTP error occurred: {}", e.getStatusCode());
//            log.error("Response body: {}", e.getResponseBodyAsString());
//        } catch (RestClientException e) {
//            // Ghi log và xử lý các lỗi RestClientException khác
//            log.error("Error occurred while creating VNPay wallet: {}", e.getMessage());
//        }
//
//        // Ném ngoại lệ nếu việc tạo ví thất bại
//        throw new RuntimeException("Failed to create VNPay wallet");
//    }
//
//    private String createSignature(String username) {
//        try {
//            // Tạo dữ liệu để ký bằng cách nối username và secret key
//            String dataToSign = username + VNPAY_API_SECRET_KEY;
//
//            // Tạo instance MessageDigest với thuật toán SHA-256
//            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
//
//            // Tạo hàm băm từ dữ liệu
//            byte[] hashedData = messageDigest.digest(dataToSign.getBytes());
//
//            // Chuyển đổi kết quả băm thành chuỗi hex
//            StringBuffer hexString = new StringBuffer();
//            for (byte b : hashedData) {
//                String hex = Integer.toHexString(0xff & b);
//                if (hex.length() == 1) hexString.append('0'); // Đảm bảo mỗi byte được biểu diễn bởi hai ký tự hex
//                hexString.append(hex);
//            }
//
//            return hexString.toString();
//        } catch (NoSuchAlgorithmException e) {
//            // Ghi log và xử lý ngoại lệ liên quan đến NoSuchAlgorithmException
//            log.error("Error creating signature", e);
//            return null;
//        }
//    }
}


