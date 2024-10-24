package com.geofence.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.geofence.dto.ReservationDTO;
import com.geofence.entity.Member;
import com.geofence.entity.Reservation;
import com.geofence.repository.MemberRepository;
import com.geofence.repository.ReservationRepository;
import com.geofence.service.ReservationService;

@RestController
@RequestMapping("/api")
public class ReservationController {
	
	@Autowired
	private ReservationRepository rr;
	
    @Autowired
    private ReservationService rs;

	
    // 예약 내역 조회
    @GetMapping("/reservations/{memberId}")
    public ResponseEntity<List<ReservationDTO>> getReservationsByMemberId(@PathVariable("memberId") String memberId) {
        List<ReservationDTO> reservations = rr.findByMemberId(memberId);
        if (reservations.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 데이터가 없을 경우 204 상태 코드
        }
        return new ResponseEntity<>(reservations, HttpStatus.OK); // 성공적으로 데이터 반환
    }
    
    // 예약 등록
    @PostMapping("/reservations")
    public ResponseEntity<ReservationDTO> createReservation(@RequestBody ReservationDTO reservationDTO) {
        ReservationDTO responseDTO = rs.createReservation(reservationDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED); // 201 Created 상태 코드 반환
    }
    
    
    // 예약 삭제
    @DeleteMapping("/reservations/{reservationNum}")
    public ResponseEntity<Void> deleteReservation(@PathVariable("reservationNum") Long reservationNum) {
        boolean exists = rr.existsById(reservationNum);
        if (!exists) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        rr.deleteById(reservationNum);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}

