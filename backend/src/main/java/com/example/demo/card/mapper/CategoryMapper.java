package com.example.demo.card.mapper;

import com.example.demo.card.dto.Category;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface CategoryMapper {

    // 카테고리 추가
    @Insert("INSERT INTO Categories (user_id, category_name) VALUES (#{userId}, #{categoryName})")
    void insertCategory(Category category);

    // 카테고리 삭제
    @Delete("DELETE FROM Categories WHERE category_name = #{categoryName}")
    void deleteCategoryByName(String categoryName);

    // 사용자 ID로 카테고리 목록 조회
    @Select("SELECT category_id, user_id, category_name, created_category_time FROM Categories WHERE user_id = #{userId}")
    List<Category> getCategoriesByUserId(String userId);

    // 사용자 ID와 카테고리 ID로 카테고리 이름 조회
    @Select("SELECT category_name FROM Categories WHERE user_id = #{userId} AND category_id = #{categoryId}")
    Category getCategoryById(@Param("userId") String userId, @Param("categoryId") int categoryId);
}
