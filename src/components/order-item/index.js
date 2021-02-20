import React, {useState} from 'react'
import {Link} from "react-router-dom";

import './order-item.scss'

const OrderItem = ({order, onSelect}) => {


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

    return (
        <div className="product-item-wrapper">
            <div className="item-wrapper">
                <Link to={"/order/" + order.id}>Просмотр</Link>
                <div className="product-item name">{order.external_id}</div>
                <div className="product-item name">{textStatus(order.status)}</div>
                <div className="product-item name">{order.created_at}</div>
                <div className="product-item name">{order.source}</div>
                <div className="product-item name">{order.available}</div>
            </div>
        </div>
    )
}

export default OrderItem;
