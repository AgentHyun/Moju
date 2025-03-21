import React, { useState, useEffect } from 'react';
import { Button, Modal, Card, Input, message, Select } from "antd";
import card_image from './images/card.png'; // 이미지 경로
import "./Category.css";
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
const { Option } = Select;

function Category() {
    const [messageApi, contextHolder] = message.useMessage();  // useMessage 훅 호출
    const [addCategoryModalVisible, setAddCategoryModalVisible] = useState(false);
    const [addProductModalVisible, setAddProductModalVisible] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(''); // 카테고리 이름을 저장
    const [newProductName, setNewProductName] = useState('');
    const [newProductCost, setNewProductCost] = useState('');
    const [cards, setCards] = useState([]);

    const success = (msg) => {
        messageApi.open({
            type: 'success',
            content: msg,
            duration: 10,
        });
    };

    const warning = (msg) => {
        messageApi.open({
            type: 'warning',
            content: msg,
        });
    };

    const addCategory = () => {
        setAddCategoryModalVisible(true);
    };

    const addProduct = () => {
        if (!currentCategory) {
            warning('카테고리를 먼저 추가하세요.');
            return;
        }
        setAddProductModalVisible(true);
    };

    const handleCategoryOk = async () => {
        if (!newCategory) {
            warning('카테고리 이름을 입력하세요.');
            return;
        }

        // 카테고리 서버에 추가
        try {
            const response = await axios.post('http://localhost:8080/api/categories/add_category', {
                userId: 'user123',  // 실제 로그인된 사용자 ID로 대체
                categoryName: newCategory
            });
            setCategories([...categories, newCategory]);
            setCurrentCategory(newCategory);  // 카테고리 이름 설정
            success('카테고리가 추가되었습니다!');
            setAddCategoryModalVisible(false);
            setNewCategory('');
        } catch (error) {
            warning('카테고리 추가 실패!');
            console.error(error);
        }
    };

    const handleProductOk = () => {
        if (!newProductName || !newProductCost) {
            warning('상품 이름과 가격을 입력하세요.');
            return;
        }
        const newCard = {
            category: currentCategory,
            name: newProductName,
            cost: parseInt(newProductCost, 10) || 0,
        };
        setCards([...cards, newCard]);
        success('상품이 추가되었습니다!');
        setAddProductModalVisible(false);
        setNewProductName('');
        setNewProductCost('');
    };

    // 카테고리 변경 함수
    const changeCategory = (direction) => {
        const currentIndex = categories.indexOf(currentCategory);
        if (direction === 'next' && currentIndex < categories.length - 1) {
            setCurrentCategory(categories[currentIndex + 1]);
        } else if (direction === 'prev' && currentIndex > 0) {
            setCurrentCategory(categories[currentIndex - 1]);
        }
    };

    // Category.js
    useEffect(() => {
        const fetchCategoryById = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/categories/get_category_by_id', {
                    params: {
                        userId: 'user123',  // 실제 로그인된 사용자 ID로 대체
                        categoryId: 3      // 카테고리 번호 1번으로 조회
                    }
                });
                const category = response.data;  // 서버에서 반환된 카테고리
                setCurrentCategory(category.category_name);  // 카테고리 이름만 저장
            } catch (error) {
                console.error('카테고리 조회 실패', error);
            }
        };
        fetchCategoryById();
    }, []);


    return (
        <>
            {contextHolder}
            <div className="card-section">
                <h2 className='title'>Sortic</h2>
                <div className='card-header'>
                    <button 
                        type="text" 
                        className="arrow-btn" 
                        onClick={() => changeCategory('prev')}
                    >
                        <i className="fa fa-arrow-left"></i>
                    </button>
                    
                    <button type="text" className="category-btn" onClick={addCategory}>+</button>
                    <div className="category-title">{currentCategory || '오류'}</div> {/* 카테고리 이름 표시 */}
                    <button type="text" className="category-btn">-</button>

                    <button 
                        type="text" 
                        className="arrow-btn" 
                        onClick={() => changeCategory('next')}
                    >
                        <i className="fa fa-arrow-right"></i>
                    </button>
                </div>

                <div className="box-section">
                    <div className='category-box'></div>
                    <button type="text" className="category-btn-box" onClick={addProduct}>+</button>
                </div>

                <Modal
                    title="카테고리 추가"
                    open={addCategoryModalVisible}
                    onOk={handleCategoryOk}
                    onCancel={() => setAddCategoryModalVisible(false)}
                >
                    <Input
                        placeholder="새 카테고리 이름"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                </Modal>

                <Modal
                    title="상품 추가"
                    open={addProductModalVisible}
                    onOk={handleProductOk}
                    onCancel={() => setAddProductModalVisible(false)}
                >
                    <Input
                        placeholder="상품 이름 입력"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        style={{ marginBottom: 15 }}
                    />
                    <Input
                        placeholder="상품 가격 입력"
                        type="number"
                        value={newProductCost}
                        onChange={(e) => setNewProductCost(e.target.value)}
                    />
                </Modal>

                <div className='card-list'>
                    {cards.map((card, index) => (
                        <Card key={index} className='card-item'>
                            <p>{card.category}</p>
                            <p>{card.name}</p>
                            <p>{card.cost}원</p>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Category;
