package com.example.firstDemoHihi.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_customer", nullable = false, length = 255)
    private String idCustomer;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "email", nullable = false, length = 50)
    private String email;

    @Column(name = "phone", nullable = false, length = 50)
    private String phone;

    @OneToOne()
    @JoinColumn(name = "id_account", nullable = false, referencedColumnName = "id_account")
    private Account account;

    @OneToOne(mappedBy = "customer")
    private Wallet wallet;

    @OneToMany(mappedBy = "customer")
    private Set<Booking> bookingSet;


}