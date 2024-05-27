package com.example.firstDemoHihi.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "wallet")
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_wallet", nullable = false, length = 255)
    private String idWallet;

    @Column(name = "bank_number", nullable = false, length = 20)
    private String bankNumber;

    @Column(name = "balance", nullable = false, precision = 10)
    private long balance;

    @OneToOne()
    @JoinColumn(name = "id_customer", nullable = false, referencedColumnName = "id_customer")
    private Customer customer;

}