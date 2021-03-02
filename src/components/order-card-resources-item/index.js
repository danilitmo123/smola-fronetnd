import React, {useEffect, useState} from "react";

import './order-card-resources-item.scss'

const OrderCardResourcesItem = ({data}) => {
    let background = false

    const items = data.order_specification.map(item => {
        background = !!data.missing_specifications.includes(item.specification.id);
        return (
            <div className={background ? 'order-card-resources-wrapper active' : 'order-card-resources-wrapper'}>
                <div className={'order-resource-id'}>{item.specification.id}</div>
                <div className={'order-resource-name'}>{item.specification.name}</div>
                <div className={'order-resource-amount'}>{item.amount}</div>
            </div>

        )
    })

    return (
        <div>{items}</div>
    )
}

export default OrderCardResourcesItem