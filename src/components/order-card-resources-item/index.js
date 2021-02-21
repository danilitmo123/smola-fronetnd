import React from "react";

import './order-card-resources-item.scss'

const OrderCardResourcesItem = ({data}) => {

  const items = data.order_specification.map(item =>(
      <div className={'order-card-resources-wrapper'}>
        <div>{item.specification.id}</div>
        <div>{item.specification.name}</div>
        <div>{item.amount}</div>
      </div>

  ))

  return(
      <div>{items}</div>
  )
}

export default OrderCardResourcesItem