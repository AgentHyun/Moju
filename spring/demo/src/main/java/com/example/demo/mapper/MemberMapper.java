package com.example.demo.mapper;  // 실제 패키지 경로

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.dao.MemberDAO;

@Mapper
public interface MemberMapper {

    void save(MemberDAO memberDAO);  // MemberDAO 객체를 받아서 저장하는 메서드
}
