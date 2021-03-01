import React, {useEffect, useState} from "react";

import './order-card-resources-item.scss'

const OrderCardResourcesItem = ({data}) => {

  const [background, setBackground] = useState(false)

  useEffect(()=> {
    data.missing_specifications.map(el => {
      if(el === data.order_specification[0].specification.id) {
        setBackground(true)
      } else {
        setBackground(false)
      }
    })
  })

  const items = data.order_specification.map(item =>(
      <div className={background ? 'order-card-resources-wrapper active' : 'order-card-resources-wrapper'}>
        <div className={'order-resource-id'}>{item.specification.id}</div>
        <div className={'order-resource-name'}>{item.specification.name}</div>
        <div className={'order-resource-amount'}>{item.amount}</div>
      </div>

  ))

  return(
      <div>{items}</div>
  )
}

export default OrderCardResourcesItem