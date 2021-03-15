import React from "react";

import './card-item.scss'

const CardItem = ({data, response}) => {

  let id = []
  let amount = null

  if(response.data) {
    id = response.data.map(i => i.id)
    amount = response.data.map(i => {
      return <div>{i.amount}</div>
    })
  }



  const items = data.resources.map(item => (
      <div className={'resource-item-wrapper'}>
        <div className={'resource-external-id'}>{item.resource.external_id}</div>
        <div className={'resource-name'}>{item.resource.name}</div>
        <div className={'resource-amount'}>{parseInt(item.amount)}{id ? id.includes(item.resource.id) ? 'da' : 'net': 'net'}</div>
      </div>
  ))

  return(
    <div>{items}</div>
  )
}

export default CardItem