import React, { useState } from 'react';
import { Button, Modal, Card, Input, message } from "antd";
import card from './images/card.png'; // 이미지 경로
import "./Category.css";

function Category() {
    const [AddModalVisible, setAddModalVisible] = useState(false);
   
    const [newProductName, setNewProductName] = useState('');
    const [newProductQuantity, setNewProductQuantity] = useState('');
    const [cards, setCards] = useState([
       
        ]);
    const [registeredProducts, setRegisteredProducts] = useState([]);
    const addCard = () => {
        if (cards.length < 100) {
            setAddModalVisible(true); 
        } else {
            message.warning("카드는 최대 100개까지 추가할 수 있습니다.");
        }
    };

    const handleCancel = () => {
        setAddModalVisible(false);
    };
    const handleOk = () => {
        if (!newProductName || !newProductQuantity) {
            message.warning("상품 이름과 수량을 입력하세요.");
            return;
        }
    
        const registeredProduct = registeredProducts.find(product => product.name === newProductName);
    
        if (!registeredProduct) {
            message.warning("등록되지 않은 상품입니다.");
            return;
        }
    

        const nextCardNumber = cards.length > 0 ? cards[cards.length - 1].number + 1 : 1;
    
        const newCard = {
            number: nextCardNumber,
            name: newProductName,
            quantity: parseInt(newProductQuantity, 10),
            image: registeredProduct.image,
            cost: registeredProduct.cost
        };
    
        setCards([...cards, newCard]);
        message.success(`${newProductName} ${newProductQuantity}개가 추가되었습니다.`);
        setNewProductName('');
        setNewProductQuantity('');
        setAddModalVisible(false);

        
    };
    return (
        <div className="card-section">
          <h2>모두의 주문</h2>
           <div className='card-header'>
            <h4>카테고리</h4>
            <Button type="text" className="add-btn" onClick={addCard}>추가</Button>
            <Button type="text" className="delete-btn">삭제</Button>
            </div>

            <Modal
                title="카드 등록"
                visible={AddModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>닫기</Button>,
                ]}
                className="Modal"
            >
               <div className="input-container">
                        <Input
                            placeholder="상품 이름"
                            value={newProductName}
                            onChange={setNewProductName}
                            style={{ width: '400px', height: 40, marginBottom: 15 }}>
                    
                        </Input>
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
                  



            </Modal>
            <div className='card-list'>
             
             <Card hoverable>
                 <img src={card} alt="카드 이미지" className="card-image" />
             </Card>
             <Card hoverable>
                 <img src={card} alt="카드 이미지" className="card-image" />
             </Card>
             <Card hoverable>
                 <img src={card} alt="카드 이미지" className="card-image" />
             </Card>
             <Card hoverable>
                 <img src={card} alt="카드 이미지" className="card-image" />
             </Card>
             
         </div>



        </div>
        
    );
}

export default Category;
