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
@Table(name = "yacht_type")
public class YachtType {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_yacht_type", nullable = false, length = 255)
    private String idYachtType;

    @Column(name = "star_ranking", nullable = false)
    private int starRanking;

    @OneToMany(mappedBy = "yachtType")
    private Set<Yacht> yachtSet;

}