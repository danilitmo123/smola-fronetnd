import React, {useEffect, useState} from "react";

import './order-card-resources-item.scss'
import {OrderSpecificationItem} from "./specification-item"

const OrderCardSpecificationItem = ({data, reload}) => {
    let background = false

    const [items, setItems] = useState([])

    useEffect(() => {
        setItems([...data.order_specification.map(item => {
            background = !!data.missing_specifications.includes(item.specification.id);
            console.log({item})
            return (<OrderSpecificationItem orderId={data.id} orderSpec={item} background={background}
                                            active={data.status === 'ACT' || data.status ===  'ASS'}  reload={reload}/>)
        })])
    })

    return (<div>{items}</div>)
}

export default OrderCardSpecificationItem