package com.example.demo.card.controller;

import com.example.demo.card.dto.Category;
import com.example.demo.card.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/add_category")
    public String addCategory(@RequestBody Category category) {
        categoryService.addCategory(category);
        return "카테고리가 성공적으로 등록되었습니다!";
    }

    @PostMapping("/delete_category")
    public String deleteCategory(@RequestParam String categoryName) {
        categoryService.deleteCategoryByName(categoryName);
        return "카테고리가 성공적으로 삭제되었습니다!";
    }

    // GET 방식으로 수정하여 userId로 카테고리 목록을 반환
    @GetMapping("/get_category")
    public List<Category> getCategories(@RequestParam String userId) {
        return categoryService.getCategoriesByUserId(userId);  // 사용자 ID로 카테고리 목록 조회
    }

    // 사용자 ID와 카테고리 ID로 카테고리 조회
    @GetMapping("/get_category_by_id")
    public Category getCategoryById(@RequestParam String userId, @RequestParam int categoryId) {
        return categoryService.getCategoryById(userId, categoryId);
    }
}
