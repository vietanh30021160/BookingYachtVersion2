package com.example.YachtBookingBackEnd.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_customer", nullable = false)
    private String idCustomer;

    @Column(name = "full_name", length = 50)
    private String fullName;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @OneToOne()
    @JoinColumn(name = "id_account", nullable = false, referencedColumnName = "id_account")
    private Account account;

    @OneToOne()
    @JoinColumn(name = "id_wallet_customer", nullable = false, referencedColumnName = "id_wallet")
    private Wallet wallet;

    @OneToMany(mappedBy = "customer")
    private Set<BookingOrder> bookingOrderSet;

    @OneToMany(mappedBy = "customer")
    private Set<Feedback> feedbackSet;
}