import React from 'react'
import { Button } from "antd";
import "./Category.css";

function Category() {
  return (
    <div className = "card-section">

        <h4>카드섹션</h4>
        <Button type="text" className = "add-btn">추가</Button>
        <Button type="text" className = "delete-btn">삭제</Button>
        <div className='card-list'>
              
        </div>
        
    </div>
  )
}

export default Category
