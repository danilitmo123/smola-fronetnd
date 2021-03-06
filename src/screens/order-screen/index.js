import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {listOrders} from '../../actions/order-list-actions'
import Loader from "../../components/spinner";
import ErrorMessage from "../../components/error-message";
import OrderCard from "../../components/order-card";
import './order-screen.scss'
import OrderItem from "../../components/order-item";
import {switchMainPageAction, switchOrderPageAction} from "../../actions/switch-page-actions";

const OrderScreen = () => {


    const dispatch = useDispatch()
    const orderList = useSelector(state => state.orderList)
    const {error, loading, orders} = orderList
    const [selectedItem, setSelectedItem] = useState(null)

    const itemSelected = (value) => {
        if (selectedItem === value) {
            setSelectedItem(null)
        } else {
            setSelectedItem(value)
        }
    }

    useEffect(()=>{
        dispatch(switchOrderPageAction())
    })
    useEffect(() => {
        dispatch(listOrders())
    }, [dispatch])

    return (
        <div className="order-screen-wrapper">
            <div className="menu-wrapper">
                <div className="nav-item">ID заказа</div>
                <div className="nav-item">Статус</div>
                <div className="nav-item">Дата заказа</div>
                <div className="nav-item">Источник заказа</div>
                <div className="nav-item">Доступность к сборке</div>
            </div>
            {
                loading ? <Loader/>
                    : error ? <ErrorMessage variant={'danger'}>{error}</ErrorMessage>
                    :
                    <div>
                        {
                            Object.values(orders).map(order => {
                                return <OrderItem key={order.id} onSelect={itemSelected} order={order}/>
                            })
                        }
                    </div>
            }
            <OrderCard
                onClose={() => setSelectedItem(null)}
                active={selectedItem != null}
                order={
                    Object.values(orders)
                        .find(order => order.id === selectedItem)
                }
            />
        </div>
    )
}
export default OrderScreen;
