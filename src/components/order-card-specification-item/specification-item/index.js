import React, {useState} from "react";
import axiosAPI from "../../api/axiosApi";
import {useDispatch} from "react-redux";
import {listOrders} from "../../../actions/order-list-actions";

export const OrderSpecificationItem = ({orderId, orderSpec, active, background, reload}) => {

    const dispatch = useDispatch()

    const assemble = () => {
        axiosAPI.post('order/assemble-specification/',
            {
                'order_id': orderId,
                'specification_id': orderSpec.specification.id
            })
            .then(response => {
                reload()
                dispatch(listOrders())
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className={background ? 'order-card-resources-wrapper active' : 'order-card-resources-wrapper'}>
            <div className={'order-resource-id'}>{orderSpec.specification.id}</div>
            <div className={'order-resource-name'}>{orderSpec.specification.name}</div>
            <div className={'order-resource-amount'}>{orderSpec.amount}</div>
            <input type="checkbox" disabled={!active} checked={orderSpec.assembled} onClick={e => {
                if (active) {
                    assemble()
                }
            }}/>
        </div>)
}