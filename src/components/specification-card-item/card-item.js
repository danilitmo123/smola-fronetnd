import React, {useState} from "react";

import './card-item.scss'

const CardItem = ({data, responseData}) => {
    let amountDict = {}
    let redAlertDict = {}

    if (responseData) {
        Object.values(responseData).map(pair => {
            amountDict[pair.id] = pair.amount
            redAlertDict[pair.id] = pair && pair.amount < 0;
        })
    }


    const items = data.resources.map(item => (
        <div className={redAlertDict[item.resource.id]? 'resource-item-wrapper active' : 'resource-item-wrapper'}>
            <div className={'resource-external-id'}>{item.resource.external_id}</div>
            <div className={'resource-name'}>{item.resource.name}</div>
            <div className={'resource-amount'}>{parseInt(item.amount)}</div>
            {amountDict.hasOwnProperty(item.resource.id) ?
                <div className={'resource-amount'}>({amountDict[item.resource.id]})</div> : ''}
        </div>
    ))

    return (
        <div>{items}</div>
    )
}

export default CardItem