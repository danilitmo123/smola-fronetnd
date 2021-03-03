import React from "react";

import './card-item.scss'

const CardItem = ({data}) => {

  const items = data.resources.map(item => (
      <div className={'resource-item-wrapper'}>
        <div className={'resource-external-id'}>{item.resource.external_id}</div>
        <div className={'resource-name'}>{item.resource.name}</div>
        <div className={'resource-amount'}>{parseInt(item.amount)}</div>
      </div>
  ))

  return(
    <div>{items}</div>
  )
}

export default CardItem