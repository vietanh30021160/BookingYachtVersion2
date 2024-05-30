package com.example.firstDemoHihi.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "schedule")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_schedule", nullable = false, length = 255)
    private String idSchedule;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @ManyToOne()
    @JoinColumn(name = "id_yacht", nullable = false)
    private Yacht yacht;

    @OneToMany(mappedBy = "schedule")
    private Set<Booking> bookingSet;
}