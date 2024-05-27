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
@Table(name = "owner")
public class Owner {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_owner", nullable = false, length = 255)
    private String idOwner;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @Column(name = "exist", nullable = false)
    private int exist;

    @ManyToOne()
    @JoinColumn(name = "id_company", nullable = false)
    private Company company;


    @OneToMany(mappedBy = "owner", fetch = FetchType.EAGER)
    private Set<Yacht> yachtSet;


}