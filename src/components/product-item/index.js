import React from 'react'

import './product-item.scss'

const ProductItem = ({product}) => {
    console.log(product)
    product.map(item => console.log(item.name))
    return (
        <div className="product-item-wrapper">
            <div className="product-item id">{product.id}</div>
            <div className="product-item name">{product.name}</div>
            <div className="product-item price">{product.cost}</div>
            <div className="product-item count">{product.amount}</div>
            <div className="product-item diller">{}</div>
            <div className="product-item last-price-change">{}</div>
            <div className="product-item last-count-change">{}</div>
        </div>
    )
}

export default ProductItem
