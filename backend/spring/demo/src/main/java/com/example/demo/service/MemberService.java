
package com.example.demo.service;
import org.springframework.stereotype.Service;

import com.example.demo.dao.MemberDAO;
import com.example.demo.mapper.MemberMapper; 

@Service
public class MemberService {

    private final MemberMapper memberMapper;

    public MemberService(MemberMapper memberMapper) {
        this.memberMapper = memberMapper;
    }

    public void addMember(MemberDAO memberDAO) {
        memberMapper.save(memberDAO);
    }
}
