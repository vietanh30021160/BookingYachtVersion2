package com.example.YachtBookingBackEnd.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "yacht_type")
public class YachtType {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_yacht_type", nullable = false)
    private String idYachtType;

    @Column(name = "star_ranking")
    private int starRanking;

    @OneToMany(mappedBy = "yachtType")
    private Set<Yacht> yachtSet;
}