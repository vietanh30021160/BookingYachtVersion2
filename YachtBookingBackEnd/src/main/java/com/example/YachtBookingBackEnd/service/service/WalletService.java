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
    @NonFinal
    @Value("${vnpay.api.url}")
    protected String VNPAY_API_URL;

    @NonFinal
    @Value("${vnpay.api.secret-key}")
    protected String VNPAY_API_SECRET_KEY;

    @NonFinal
    @Value("${vnpay.api.access-key}")
    protected String VNPAY_API_ACCESS_KEY;

    final RestTemplate restTemplate;

    @Override
    public String createVnpayWallet(Customer customer) {
        String url = VNPAY_API_URL + "wallet/create";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Tạo chuỗi chữ ký (signature) dựa trên secret-key và các thông tin khác
        String signature = createSignature(customer.getAccount().getUsername());

        // Tạo request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("access_key", VNPAY_API_ACCESS_KEY);
        requestBody.put("secret_key", VNPAY_API_ACCESS_KEY);
        requestBody.put("username", customer.getAccount().getUsername());
        requestBody.put("signature", signature);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        // Gửi yêu cầu tạo ví đến VNPay API
        ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

        // Xử lý response và trả về wallet_id
        if (response.getStatusCode() == HttpStatus.OK) {
            Map<String, Object> responseBody = response.getBody();
            if (responseBody != null) {
                return (String) responseBody.get("wallet_id");
            }
        }
        throw new RuntimeException("Failed to create VNPay wallet");
    }

    private String createSignature(String username) {
        try {
            String dataToSign = username + VNPAY_API_SECRET_KEY;
            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
            byte[] hashedData = messageDigest.digest(dataToSign.getBytes());

            // Chuyển đổi kết quả băm thành chuỗi hex
            StringBuffer hexString = new StringBuffer();
            for (byte b : hashedData) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }

            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            log.error("Error creating signature", e);
            return null;
        }
    }

    // Phương thức giả định hàm băm, bạn cần thay thế bằng hàm băm thực tế
    private String hashFunction(String data) {
        // Đây là một phương thức giả định, bạn cần thay thế bằng hàm băm thực tế
        // Ví dụ: sử dụng thư viện java.security.MessageDigest để tạo chữ ký
        // Đảm bảo sử dụng thuật toán hash mạnh và an toàn
        return data; // Giả định là hàm băm trả về cùng chuỗi với dữ liệu đầu vào (chỉ để minh họa)
    }
}


