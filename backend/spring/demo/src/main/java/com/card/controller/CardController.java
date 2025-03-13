
package com.card.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.card.dto.Card;
import com.card.service.CardService;

@RestController
@RequestMapping("/cards")
@CrossOrigin(origins = "http://localhost:3000") // CORS 설정
public class CardController {
    @Autowired
    private CardService cardService;

    @PostMapping("/add")
    public ResponseEntity<String> addCard(@RequestBody Card card) {
        cardService.saveCard(card);
        return ResponseEntity.ok("Card added successfully");
    }
}
