package com.card.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.card.mapper.CardMapper;
import com.card.dto.Card;

@Service
public class CardService {
    @Autowired
    private CardMapper cardMapper;

    public void saveCard(Card card) {
        cardMapper.insertCard(card);
    }
}
