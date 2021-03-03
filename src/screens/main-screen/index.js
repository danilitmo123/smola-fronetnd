import React, {useEffect, useState} from "react";
import {switchMainPageAction} from "../../actions/switch-page-actions"
import './main-screen.scss'
import {useDispatch} from "react-redux";
import axiosAPI from "../../components/api/axiosApi";

const MainScreen = () => {

    const [criticalResourceAmount, setCriticalResourceAmount] = useState()
    const [orderAmount, setOrderAmount] = useState()
    const [verifyPriceAmount, setVerifyPriceAmount] = useState()


    const dispatch = useDispatch()

    useEffect(() => {
            dispatch(switchMainPageAction())
            axiosAPI.get('resource/expired-count/')
                .then(response => setCriticalResourceAmount(response.data.count))
                .catch(error => console.log({error}))
            axiosAPI.get('specification/verify-price-amount/')
                .then(response => setVerifyPriceAmount(response.data.count))
                .catch(error => console.log({error}))
            axiosAPI.get('order/status-count/')
                .then(response => setOrderAmount(response.data))
                .catch(error => console.log({error}))
        }, [dispatch]
    )


    return (
        <div className={'main-screen-wrapper'}>
            <div className="main-screen-card">
                <div className="card-title">{criticalResourceAmount}</div>
                <div className="card-info">Количество закончившихся товаров</div>
            </div>
            <div className="main-screen-card">
                <div className={'title-wrapper'}>
                    <div className="card-title green">{orderAmount ? orderAmount.ready: null}</div>
                    <div className="card-title yellow">{orderAmount? orderAmount.active + orderAmount.assembling: null}</div>
                    <div className="card-title red">{orderAmount ? orderAmount.inactive: null}</div>
                </div>
                <div className="card-info">Количество заказов</div>
            </div>
            <div className="main-screen-card">
                <div className="card-title">{verifyPriceAmount}</div>
                <div className="card-info">Цены которые нужно подтвердить</div>
            </div>
        </div>
    )
}

export default MainScreen