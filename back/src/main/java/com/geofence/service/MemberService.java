package com.geofence.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.geofence.dto.MemberDTO;
import com.geofence.entity.Member;
import com.geofence.exception.MemberIdException;
import com.geofence.repository.MemberRepository;

@Service
public class MemberService {
	
	@Autowired
	private MemberRepository mr;

	public MemberDTO registerMember(MemberDTO memberDto) throws MemberIdException {
		
		// 아이디 중복 예외처리
		if(mr.existsById(memberDto.getId())) {
			throw new MemberIdException("이미 중복된 아이디입니다. 다시 확인해주세요.");
		}
		
		// 이상이 없을 시 DB 삽입 진행
		Member member = new Member();
		member.setId(memberDto.getId());
		member.setPwd(memberDto.getPwd());
		
		Member saveMember = mr.save(member);
		
        return new MemberDTO(saveMember.getMemberNum(), saveMember.getId(), saveMember.getPwd());
    
	}
	
	
}
