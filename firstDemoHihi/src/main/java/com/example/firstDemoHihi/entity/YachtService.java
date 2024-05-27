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
@Table(name = "yacht_service")
public class YachtService {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_yacht_service", nullable = false, length = 255)
    private String idServiceYacht;

    @Column(name = "service", nullable = false)
    private String service;

    @OneToMany(mappedBy = "yachtService")
    private Set<YachtDetailService> yachtDetailServiceSet;

}