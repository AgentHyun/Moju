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

    useEffect(() => {
        setRegisteredProducts([
            { name: "사과", image: card_image },
            { name: "바나나", image: card_image },
            { name: "딸기", image: card_image },
        ]);

        const initialCards = Array.from({ length: 18 }, (_, index) => ({
            number: index + 1,
            image: card_image,
        }));
        setCards(initialCards);
    }, []);

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

    const handleOk = () => {
        if (!newProductName || !newProductQuantity || !newProductCost) {
            warning();  // warning 메시지 호출
            return;
        }

        const nextCardNumber = cards.length > 0 ? Math.max(...cards.map(c => c.number)) + 1 : 1;

        const newCard = {
            number: nextCardNumber,
            name: newProductName,
            quantity: parseInt(newProductQuantity, 10) || 0,
            cost: parseInt(newProductCost, 10) || 0,
        };

        setCards(prevCards => [...prevCards, newCard]);
        success();  // 성공 메시지 호출
        handleCancel();
    };

    // 카드 선택 또는 선택 해제 처리
    const selectCard = (number) => {
        setSelectedCards(prevSelectedCards => {
            if (prevSelectedCards.includes(number)) {
                return prevSelectedCards.filter(card => card !== number);  // 이미 선택된 카드라면 배열에서 제거
            } else {
                return [...prevSelectedCards, number];  // 선택되지 않은 카드라면 배열에 추가
            }
        });
    };

    return (
        <>
            {contextHolder}  {/* contextHolder를 JSX 상위에 배치 */}
            <div className="card-section">
                <h2 class = 'title'>모두의 주문</h2>
                <div className='card-header'>
                    <h4>카테고리</h4>
                    <Button type="text" className="add-btn" onClick={addCard}>추가</Button>
                    <Button type="text" className="delete-btn">삭제</Button>
                </div>

                <Modal
                    title="카드 등록"
                    open={addModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
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
                    <div className="input-container">
                        <Input
                            placeholder="상품 이름"
                            value={newProductName}
                            onChange={(e) => setNewProductName(e.target.value)}
                            style={{ width: '400px', height: 40, marginBottom: 15 }}
                        />
                    </div>
                    <div className="input-container">
                        <Input
                            placeholder="수량"
                            type="number"
                            value={newProductQuantity}
                            onChange={(e) => setNewProductQuantity(e.target.value)}
                            style={{ width: '400px', height: 40, marginBottom: 15 }}
                        />
                    </div>
                    <div className="input-container">
                        <Input
                            placeholder="가격"
                            type="number"
                            value={newProductCost}
                            onChange={(e) => setNewProductCost(e.target.value)}
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
                            <img src={card.image} alt="product" style={{ width: 100, height: 150, objectFit: 'cover' }} />
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Category;
