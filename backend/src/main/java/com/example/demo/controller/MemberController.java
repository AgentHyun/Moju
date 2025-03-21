package com.example.demo.controller;

import com.example.demo.dao.MemberDAO;
import com.example.demo.service.MemberService;

import java.util.Map;


import org.springframework.web.bind.annotation.*;


@RestController
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

 

    @PostMapping("/signup")
    public String signup(@RequestParam Map<String, String> signupForm) {
        MemberDAO memberDAO = new MemberDAO(signupForm.get("id"), signupForm.get("password"));
        memberService.addMember(memberDAO);
        return "signup-success"; 
    }
    
    

    
}
