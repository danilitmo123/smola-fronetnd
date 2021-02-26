import React, {useState} from 'react'
import {Link} from "react-router-dom";

import './order-item.scss'

const OrderItem = ({order, onSelect}) => {

    console.log(order)
    const textStatus = (code) => {
        switch (code) {
            case "INC":
                return "Не активный";
            case "ACT":
                return "Активный";
            case "ASS":
                return "В процессе сборки";
            case "RDY":
                return "Собран";
            case "CNF":
                return "Подтверждён";
            case "CND":
                return "Отменён";
            case "ARC":
                return "Архив";

        }
    }

    const createDate = new Date(order.created_at)

    const getZero = (num) => {
        if (num >= 0 && num < 10) {
            return '0' + num
        } else {
            return num
        }
    }

    const getDate = (date) => {
        const year = date.getFullYear()
        let month = getZero(date.getMonth() + 1)
        let day = getZero(date.getDate())
        return `${day}-${month}-${year}`
    }

    const onClick = () => {
        onSelect(order.id)
    }

    console.log(order.order_specification.assembled)

    return (
        <div className="order-item-wrapper">
            <div className="order-wrapper" onClick={onClick}>
                <div className="order-item id">{order.external_id}</div>
                <div className="order-item status">{textStatus(order.status)}</div>
                <div className="order-item date">{getDate(createDate)}</div>
                <div className="order-item name">{order.source.name}</div>
                <div className="order-item available">{
                    order.missing_resources.length && order.missing_specifications.length ?
                             <div>Нельзя собрать</div> : <div>Можно собрать</div>
                }</div>
            </div>
        </div>
    )
}

export default OrderItem;
