import React, {useEffect, useState} from "react";

import './order-card-products-item.scss'


const OrderCardProductsItem = ({data}) => {

  const [background, setBackground] = useState(false)

  const classes = 'order-card-products-wrapper'



  useEffect(()=> {
    data.missing_resources.map(el => {
      if(data.order_specification[0]) {
          data.order_specification[0].specification.res_specs.map(res_id => {
            if(el === res_id.resource.id) {
              console.log(el)
              console.log(res_id.resource.id)
              setBackground(true)
            } else  {
              console.log(el)
              console.log(res_id.resource.id)
              setBackground(false)
            }
        })
      }
    })
  })

  let items = []
  if (data.order_specification[0]) {
    items = data.order_specification[0].specification.res_specs.map(resource_spec => {

      return (
          <div className={background ? 'order-card-products-wrapper active' : 'order-card-products-wrapper'}>
            <div className={'order-card-id'}>{resource_spec.resource.id}</div>
            <div className={'order-card-name'}>{resource_spec.resource.name}</div>
            <div className={'order-card-amount'}>{resource_spec.amount}</div>
          </div>
      )
    })
  }

  return (
      <div>
        {items.length ?
                <div>
                  <div className={"nav-card-products"}>
                    <div className={'ID'}>ID</div>
                    <div className={'nav-card-name'}>Название</div>
                    <div className={'nav-card-count'}>Количество</div>
                  </div>
                  {items}
                </div> : ''
                }
      </div>
  )
}
export default OrderCardProductsItem