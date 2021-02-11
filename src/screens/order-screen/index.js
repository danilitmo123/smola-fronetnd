import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {listOrders} from '../../actions/order-list-actions'
import Loader from "../../components/spinner";
import ErrorMessage from "../../components/error-message";

import './order-screen.scss'
import OrderItem from "../../components/order-item";

const OrderScreen = () => {

    const dispatch = useDispatch()
    const orderList = useSelector(state => state.orderList)
    const {error, loading, orders} = orderList




    useEffect(() => {
        dispatch(listOrders())
    }, [dispatch])


    return (
        <div className="home-screen-wrapper">
            <div className="menu-wrapper">
                <div className="nav-item">ID заказа</div>
                <div className="nav-item">Статус</div>
                <div className="nav-item">Дата заказа</div>
                <div className="nav-item">Источник заказа</div>
                <div className="nav-item">Доступоность к сборке</div>
            </div>
            {
                loading ? <Loader/>
                    : error ? <ErrorMessage variant={'danger'}>{error}</ErrorMessage>
                    :
                    <div>
                        {
                            Object.values(orders).map(order => {
                                return <OrderItem key={order.id} order={order}/>
                            })
                        }
                    </div>
            }
        </div>)
}
export default OrderScreen;
