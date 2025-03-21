package com.example.demo.card.service;

import com.example.demo.card.dto.Category;
import com.example.demo.card.mapper.CategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryMapper categoryMapper;

    // 카테고리 추가
    public void addCategory(Category category) {
        categoryMapper.insertCategory(category);
    }

    // 카테고리 삭제
    public void deleteCategoryByName(String categoryName) {
        categoryMapper.deleteCategoryByName(categoryName);
    }

    // 사용자 ID로 카테고리 목록 조회
    public List<Category> getCategoriesByUserId(String userId) {
        return categoryMapper.getCategoriesByUserId(userId);
    }

    // 사용자 ID와 카테고리 ID로 카테고리 이름 조회
    public Category getCategoryById(String userId, int categoryId) {
        return categoryMapper.getCategoryById(userId, categoryId);
    }
}
