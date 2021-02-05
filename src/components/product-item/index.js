import React from 'react'

import './product-item.scss'

const ProductItem = ({product: {id, name, cost, amount, last_change_cost, last_change_amount}}) => {
    return (
        <div className="product-item-wrapper">
            <div className="item-wrapper">
                <div className="product-item id">{id}</div>
                <div className="product-item name">{name}</div>
                <div className={'product-item price'}>{cost}</div>
                <div className="product-item count">{amount}</div>
                <div className="product-item diller">{name}</div>
                <div className="product-item last-price-change">{last_change_cost}</div>
                <div className="product-item last-count-change">{last_change_amount}</div>
            </div>
        </div>
    )
}

export default ProductItem
