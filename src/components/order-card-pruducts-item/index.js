import React from "react";

import './order-card-products-item.scss'


const OrderCardProductsItem = ({data}) => {

  console.log(data)

  let items = []
  if (data.order_specification[0]){
    items = data.order_specification[0].specification.res_specs.map(resource_spec => {

      return (
          <div className={'order-card-products-wrapper'}>
            <div>{resource_spec.resource.id}</div>
            <div>{resource_spec.resource.name}</div>
            <div>{resource_spec.amount}</div>
          </div>
      )
    })
  }

  return (
      <div>
        {items.length ? items
            :
            <div className={'no-order-wrapper'}>
              <div className={'no-order'}>Пустой заказ</div>
            </div>
        }
      </div>
  )
}

export default OrderCardProductsItem