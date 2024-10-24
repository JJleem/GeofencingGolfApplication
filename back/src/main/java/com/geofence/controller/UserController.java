package com.geofence.controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.geofence.dto.MemberDTO;
import com.geofence.dto.ReservationDTO;
import com.geofence.entity.Member;
import com.geofence.exception.MemberIdException;
import com.geofence.repository.MemberRepository;
import com.geofence.service.MemberService;

@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	private MemberRepository mr;
	
	@Autowired
	private MemberService ms;
	
	
	// 회원가입 + 로그인
	@PostMapping("/register")
	public ResponseEntity<?> registerMember(@RequestBody MemberDTO memberDto){
		MemberDTO memberDTO;
		try {
			memberDTO = ms.registerMember(memberDto);
			return new ResponseEntity<>(memberDTO, HttpStatus.CREATED);
		} catch (MemberIdException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
		}
		
	}
	
	
	// 내 정보 조회
	@GetMapping("/detail/{memberNum}")
	public ResponseEntity<MemberDTO> getMember(@PathVariable("memberNum") Long memberNum) {
	    Optional<Member> userOptional = mr.findById(memberNum);

	    if (userOptional.isPresent()) {
	        Member member = userOptional.get();

	        MemberDTO memberDTO = new MemberDTO();
	        memberDTO.setMemberNum(member.getMemberNum());
	        memberDTO.setId(member.getId());
	        memberDTO.setPwd(member.getPwd());

	        return ResponseEntity.ok(memberDTO); //
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404
	    }
	}

}

