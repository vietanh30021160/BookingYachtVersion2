//package com.example.YachtBookingBackEnd.service.service;
//
//
//import com.example.YachtBookingBackEnd.entity.BookingOrder;
//import com.example.YachtBookingBackEnd.entity.Customer;
//import com.example.YachtBookingBackEnd.entity.Feedback;
//import com.example.YachtBookingBackEnd.entity.Yacht;
//import com.example.YachtBookingBackEnd.repository.BillRepository;
//import com.example.YachtBookingBackEnd.repository.BookingOrderRepository;
//import com.example.YachtBookingBackEnd.repository.FeedbackRepository;
//import com.example.YachtBookingBackEnd.repository.TransactionRepository;
//import com.example.YachtBookingBackEnd.service.implement.IFeedback;
//import jakarta.transaction.Transactional;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//public class FeedbackService implements IFeedback {
//
//    @Autowired
//    FeedbackRepository feedbackRepository;
//
//    @Autowired
//    BookingOrderRepository bookingOrderRepository;
//
//    @Override
//    public boolean addFeedback(int starRating, String description, String idBooking, String idCustomer, String idYacht) {
//        try {
//            BookingOrder bookingOrder = bookingOrderRepository.findCompletedBookingByCustomer(idBooking, idCustomer)
//                    .orElseThrow(() -> new RuntimeException("Booking not found or not completed or does not belong to the customer"));
//
//            if(feedbackRepository.existsByIdBooking(idBooking)){
//                throw new RuntimeException("Feedback already exists for this booking");
//            }
//
//            Feedback feedback = new Feedback();
//            feedback.setStarRating(starRating);
//            feedback.setDescription(description);
//            feedback.setIdBooking(idBooking);
//            Customer customer = new Customer();
//            customer.setIdCustomer(idCustomer);
//            feedback.setCustomer(customer);
//            Yacht yacht = new Yacht();
//            yacht.setIdYacht(idYacht);
//            feedback.setYacht(yacht);
//            feedbackRepository.save(feedback);
//            return true;
//        }catch (Exception e){
//            System.out.println("error" + e.getMessage());
//            return false;
//        }
//    }

//    @Autowired
//    BillRepository billRepository;

//    @Autowired
//    TransactionRepository transactionRepository;

//    @Transactional
//    public Feedback addFeedback(int starRating, String description, String idBooking, String idCustomer, String idYacht ) {
//        // Check if the booking exists, is completed, and belongs to the customer
//        BookingOrder bookingOrder = bookingOrderRepository.findCompletedBookingByCustomer(idBooking, idCustomer)
//                .orElseThrow(() -> new RuntimeException("Booking not found or not completed or does not belong to the customer"));
//        // Check if the booking has already been feedback
//        if(feedbackRepository.existsByIdBooking(idBooking)){
//            throw new RuntimeException("Feedback already exists for this booking");
//        }
//        // Check if the booking has a bill and the bill is paid
////        if(!billRepository.existsByBookingOrderId(bookingId)){
////            throw new RuntimeException("Bill does not exist for this booking");
////        }
//
//        // Check if the transaction is successful
////        if(!transactionRepository.existsByBookingOrderIdAndStatus(bookingId, "success")){
////            throw new RuntimeException("Transaction does not exist for this booking");
////        }
//
//
//        Feedback feedback = new Feedback();
//        feedback.setStarRating(starRating);
//        feedback.setDescription(description);
//        feedback.setIdBooking(idBooking);
//        Customer customer = new Customer();
//        customer.setIdCustomer(idCustomer);
//        feedback.setCustomer(customer);
//        Yacht yacht = new Yacht();
//        yacht.setIdYacht(idYacht);
//        feedback.setYacht(yacht);
//        return feedbackRepository.save(feedback);
//
//    }
//}
