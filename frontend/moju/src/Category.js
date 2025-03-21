import React, { useState, useEffect } from 'react';
import { Button, Modal, Card, Input, message } from "antd";
import card_image from './images/card.png'; // 이미지 경로
import "./Category.css";

function Category() {
    const [messageApi, contextHolder] = message.useMessage();  // useMessage 훅 호출
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [newProductCategory, setNewProductCategory] = useState('');
    const [newProductName, setNewProductName] = useState('');
    const [newProductQuantity, setNewProductQuantity] = useState('');
    const [newProductCost, setNewProductCost] = useState('');
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);  // 선택된 카드를 배열로 관리
    const [registeredProducts, setRegisteredProducts] = useState([]);
    const [memoSections, setMemoSections] = useState([]);  // 추가된 메모 섹션 관리

    const success = () => {
        messageApi.open({
            type: 'success',
            content: '등록에 성공하였습니다!',
            duration: 10,
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: '상품 등록에 실패하였습니다.',
        });
    };

    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: '상품 이름, 수량, 가격을 모두 입력하세요.',
        });
    };

    const addCard = () => {
        if (cards.length < 100) {
            setAddModalVisible(true);
        } else {
            message.warning("카드는 최대 100개까지 추가할 수 있습니다.");
        }
    };

    const handleCancel = () => {
        setAddModalVisible(false);
        setNewProductName('');
        setNewProductQuantity('');
        setNewProductCost('');
    };
    const handleOk = async () => {
        if (!newProductName || !newProductQuantity || !newProductCost || !newProductCategory) {
            warning();
            return;
        }
    
        const nextCardNumber = cards.length > 0 ? Math.max(...cards.map(c => c.number)) + 1 : 1;
    
        const newCard = {
            number: nextCardNumber,
            category: newProductCategory,  // 카테고리 추가
            name: newProductName,
            quantity: parseInt(newProductQuantity, 10) || 0,
            cost: parseInt(newProductCost, 10) || 0,
        };
    
        try {
            const response = await fetch("/api/cards/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCard),
            });
    
            if (response.ok) {
                const savedCard = await response.json();
    
                setCards(prevCards => {
                    let updatedCards = [savedCard, ...prevCards]; // 새 카드를 앞에 추가
    
                    if (updatedCards.length > 18) {
                        updatedCards = updatedCards.slice(0, 18); // 18개를 넘으면 처음 18개만 유지
                    }
    
                    return updatedCards; // 변경된 배열을 반환하여 상태 업데이트
                });
    
                success();
                handleCancel();
            } else {
                console.error("Failed to add card");
                error();
            }
        } catch (err) {
            console.error("Error:", err);
            error();
        }
    };

    const selectCard = (number) => {
        setSelectedCards(prevSelectedCards => {
            if (prevSelectedCards.includes(number)) {
                return prevSelectedCards.filter(card => card !== number);  // 이미 선택된 카드라면 배열에서 제거
            } else {
                return [...prevSelectedCards, number];  // 선택되지 않은 카드라면 배열에 추가
            }
        });
    };


    const addMemoSection = () => {
        setMemoSections(prevSections => [...prevSections, {}]);  // 새로운 memo section 추가
    };

    return (
        <>
            {contextHolder}  {/* contextHolder를 JSX 상위에 배치 */}
            <div className="card-section">
                <h2 className='title'>Sortic</h2>
                <div className='card-header'>
                    <button type="text" className="category-btn" onClick={addCard}>+</button>
                    <div className="category-title">카테고리</div>
                    <button type="text" className="category-btn2" onClick={addCard}>-</button>
                </div>

                <div className='box-section'><div className='category-box'></div>  <button type="text" className="category-btn-box" onClick={addCard}>+</button></div>
                <button type="text" className="category-btn3" onClick={addMemoSection}>+</button>

                {/* 추가된 메모 섹션들 */}
                <div className='memo-sections'>
                    {memoSections.map((_, index) => (
                        <div key={index} className="memo-section">
              
                        </div>
                    ))}
                </div>

                <Modal
                    title="카드 등록"
                    open={addModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    style={{ height : 100 }}
                    footer={[
                        <Button key="back" onClick={handleCancel}>닫기</Button>,
                        <Button key="submit" type="primary" onClick={handleOk}>등록</Button>
                    ]}
                    className="Modal"
                >
                    <div className="input-container">
                        <Input
                            placeholder="카테고리"
                            value={newProductCategory}
                            onChange={(e) => setNewProductCategory(e.target.value)}
                            style={{ width: '400px', height: 40, marginBottom: 15 }}
                        />
                    </div>
                    
                </Modal>

                <div className='card-list'>
                    {cards.map((card) => (
                        <Card
                            key={card.number}
                            className={`card-item ${selectedCards.includes(card.number) ? 'selected' : ''}`}  // 다중 선택 처리
                            onClick={() => selectCard(card.number)}
                        >
                            {card.name}
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Category;
