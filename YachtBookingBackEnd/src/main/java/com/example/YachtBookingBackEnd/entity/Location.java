package com.example.YachtBookingBackEnd.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "location")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_location", nullable = false)
    private String idLocation;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "location")
    private Set<Yacht> yachtSet;
}