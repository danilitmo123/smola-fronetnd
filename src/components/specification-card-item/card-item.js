import React, {useState} from "react";

import './card-item.scss'

const CardItem = ({data, responseData}) => {
    let amountDict = {}

    if (responseData) {
        Object.values(responseData).map(pair => {
            amountDict[pair.id] = pair.amount
        })
    }

    const items = data.resources.map(item => (
        <div className={'resource-item-wrapper'}>
            <div className={'resource-external-id'}>{item.resource.external_id}</div>
            <div className={'resource-name'}>{item.resource.name}</div>
            <div className={'resource-amount'}>{parseInt(item.amount)}</div><>  |  </>
            <div className={'resource-amount'}>{amountDict.hasOwnProperty(item.resource.id) ? amountDict[item.resource.id] : ''}</div>
        </div>
    ))

    return (
        <div>{items}</div>
    )
}

export default CardItem