import React, {useState} from 'react'

const OrderItem = ({order}) => {


    const textStatus = (code) => {
        switch (code) {
            case "INC":
                return "Не активный";
            case "ACT":
                return "Активный";
            case "ASS":
                return "В процессе сборке";
            case "RDY":
                return "Собран";
            case "CNF":
                return "Подтверждён";
            case "CND":
                return "тменён";
            case "ARC":
                return "Архив";

        }
    }

    return (
        <div className="product-item-wrapper">
            <div className="item-wrapper">
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
