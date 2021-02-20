import React from "react";

import './order-card-products-item.scss'
import {resourcesInSpecificationReducers} from "../../reducers/resources-in-spec-reducers";

const OrderCardProductsItem = ({data}) => {

  const items = data.order_specification[0].specification.res_specs.map(resource_spec => {
    return {
      amount: resource_spec.amount,
      name: resource_spec.resource.name
    }
  })
  console.log(data.order_specification[0])
  console.log(items)

  return (
      <div>
        {items[0].name}
      </div>
  )
}

export default OrderCardProductsItem