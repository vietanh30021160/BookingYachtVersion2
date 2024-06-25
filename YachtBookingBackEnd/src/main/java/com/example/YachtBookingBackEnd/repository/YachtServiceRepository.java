package com.example.YachtBookingBackEnd.repository;

import com.example.YachtBookingBackEnd.entity.YachtService;
import com.example.YachtBookingBackEnd.entity.key.KeysYachtService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface YachtServiceRepository extends JpaRepository<YachtService, KeysYachtService> {
    @Query("SELECT ys FROM YachtService ys WHERE ys.yacht.idYacht = :idYacht")
    List<YachtService> findServicesByYachtId(@Param("idYacht") String idYacht);

    Optional<YachtService> findByKeys(KeysYachtService keys);

    @Query("SELECT COUNT(ys) > 0 " +
            "FROM YachtService ys " +
            "WHERE ys.service.idService = :idService " +
            "AND ys.yacht.idYacht = :idYacht")
    boolean isServiceExistInYacht(@Param("idService") String idService, @Param("idYacht") String idYacht);
}
