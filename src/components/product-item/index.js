import React from 'react'

import './product-item.scss'

const ProductItem = ({product}) => {
    return (
        <div className="product-item-wrapper">
            <div className="product-item id">1</div>
            <div className="product-item name">Коробка</div>
            <div className="product-item price">10</div>
            <div className="product-item count">100</div>
            <div className="product-item diller">Коробочные технологии</div>
            <div className="product-item last-price-change">03.02.2021</div>
            <div className="product-item last-count-change">03.02.2021</div>
        </div>
    )
}

export default ProductItem
