package com.geofence.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.geofence.dto.ReservationDTO;
import com.geofence.entity.Member;
import com.geofence.entity.Reservation;
import com.geofence.repository.MemberRepository;
import com.geofence.repository.ReservationRepository;

import jakarta.persistence.EntityManager;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository rr;
    
    @Autowired
    private MemberRepository mr;
    
    @Autowired
    private EntityManager entityManager;

    public List<ReservationDTO> getReservationsByMemberId(String memberId) {
        return rr.findByMemberId(memberId); // 예약 정보 조회
    }

    public ReservationDTO createReservation(ReservationDTO reservationDTO) {
        // Member 객체를 DB에서 조회
        Member member = mr.findById(reservationDTO.getMemberId())
            .orElseThrow(() -> new RuntimeException("Member not found")); // 회원이 존재하지 않을 경우 예외 처리

        // ReservationDTO를 Reservation 엔티티로 변환
        Reservation reservation = new Reservation();
        reservation.setMember(member); // 조회한 Member 객체 설정
        reservation.setDate(reservationDTO.getDate());
        reservation.setTee_info(reservationDTO.getTee_info());
        reservation.setCourse_info(reservationDTO.getCourse_info());
        reservation.setLocker_info(getNextLockerNumber()); // locker_info 자동 설정
        reservation.setPersons(reservationDTO.getPersons());

        // Reservation을 DB에 저장
        Reservation savedReservation = rr.save(reservation);

        // 저장된 예약 정보를 DTO로 변환하여 반환
        return new ReservationDTO(
        	savedReservation.getReservationNum(),
            savedReservation.getMember().getId(),
            savedReservation.getDate(),
            savedReservation.getTee_info(),
            savedReservation.getCourse_info(),
            savedReservation.getLocker_info(),
            savedReservation.getPersons()
        );
    }

    private Long getNextLockerNumber() {
        return ((Number) entityManager.createNativeQuery("SELECT nextval('locker_number_seq')").getSingleResult()).longValue();
    }
}
