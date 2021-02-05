import React from 'react'

import './specification-item.scss'

const SpecificationItem = ({specification}) => {
    return (
        <div className="specification-item-wrapper">
            <div className="product-item id">{specification.id}</div>
            <div className="product-item name">{specification.name}</div>
            <div className="product-item cost-price">{specification.prime_cost}</div>
            <div className="product-item count">{specification.coefficient}</div>
            <div className="product-item diller">{specification.prime_cost * specification.coefficient}</div>
            <div className="product-item last-price-change">{specification.price}</div>
            <div className="product-item last-count-change">{`ne mogy dostat object`}</div>
            <div className="product-item last-count-change">{specification.product_id}</div>
        </div>
    )
}

export default SpecificationItem