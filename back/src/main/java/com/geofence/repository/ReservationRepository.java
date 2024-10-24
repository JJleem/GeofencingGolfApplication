package com.geofence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.geofence.dto.ReservationDTO;
import com.geofence.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    
    @Query("SELECT new com.geofence.dto.ReservationDTO(r.reservationNum, m.id, r.date, r.tee_info, r.course_info, r.locker_info, r.persons) " +
           "FROM Reservation r JOIN r.member m " +
           "WHERE m.id = :memberId")
    List<ReservationDTO> findByMemberId(@Param("memberId") String memberId);
}