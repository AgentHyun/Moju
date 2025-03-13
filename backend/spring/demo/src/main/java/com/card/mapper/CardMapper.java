package com.card.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import com.card.dto.Card;

@Mapper
public interface CardMapper {

    @Insert("INSERT INTO cards (number, name, quantity, cost) VALUES (#{number}, #{name}, #{quantity}, #{cost})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insertCard(Card card);
}
