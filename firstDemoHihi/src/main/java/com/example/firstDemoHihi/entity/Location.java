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
@Table(name = "location")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_location", nullable = false, length = 255)
    private String idLocation;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "location")
    private Set<Yacht> yachtSet;

}