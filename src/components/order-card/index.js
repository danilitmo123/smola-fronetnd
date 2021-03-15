import React, {useEffect, useState} from "react";
import './order-card.scss'
import OrderCardProductsItem from "../order-card-pruducts-item";
import OrderCardSpecificationItem from "../order-card-specification-item";
import axiosAPI from "../api/axiosApi";
import Loader from "../spinner";
import {useDispatch} from "react-redux";
import {listOrders} from "../../actions/order-list-actions";

const OrderCard = ({active, order, onClose}) => {

    const [currentCardData, setCurrentCardData] = useState(null)
    const dispatch = useDispatch()
    const getCard = async (id) => {
        const {data} = await axiosAPI.get(`order/${id}/`)
        return data
    }

    const reloadCard = () => {
        if (order) {
            getCard(order.id).then((newCard => {
                setCurrentCardData(newCard)
            }))
        }
    }

    useEffect(() => {
        reloadCard()
    }, [order])

    const manageAction = (id, action) => {
        axiosAPI.post('/order/action/',
            {
                id,
                action
            })
            .then(response => {
                reloadCard()
                dispatch(listOrders())
            })
            .catch(error => {
                console.log({error})
            })
    }
    return (
        <div className="close-wrapper">
            <div
                onClick={e => e.stopPropagation()}
                className={active ? "specification-card-wrapper active" : "specification-card-wrapper"}>
                {
                    currentCardData ? currentCardData.order_specification.length ?
                        <div>
                            <div className="header-specification-card">
                                <div className="specification-card-title">Товары</div>
                                <div className="specification-card-id">
                                    <div className="title">ID:</div>
                                    <div>{order ? order.external_id : ''}</div>
                                </div>
                                <div className="close-card-btn" onClick={onClose}>X</div>
                            </div>
                            <div className="nav-card-products">
                                <div className={'ID'}>ID</div>
                                <div className={'nav-card-name'}>Название</div>
                                <div className={'nav-card-count'}>Количество</div>
                            </div>
                            <div className={'order-card-resource-item'}>
                                {
                                    currentCardData ? <OrderCardSpecificationItem data={currentCardData} reload={reloadCard}/> : ''
                                }
                            </div>
                            <div className="header-specification-card">
                                <div className="specification-card-title">Ресурсы</div>
                            </div>
                            <div className={'order-card-resource-item'}>
                                {
                                    currentCardData ? <OrderCardProductsItem data={currentCardData}/> : ''
                                }
                            </div>
                            {currentCardData.missing_specifications.length === 0 ?
                                <div>
                                    <button
                                        className={'activate-btn'}
                                        disabled={!(currentCardData && currentCardData.status === 'INC')}
                                        onClick={e => manageAction(currentCardData.id, 'activate')}>Разобрать
                                    </button>
                                    <button
                                        className={'confirm-btn'}
                                        disabled={!(currentCardData && currentCardData.status === 'RDY')}
                                        onClick={e => {
                                            manageAction(currentCardData.id, 'confirm')
                                        }}>Отгрузить
                                    </button>

                                </div> : null}
                        </div> :
                        <div className="no-order-wrapper">
                            <div className={'no-order'}>Пустой заказ</div>
                        </div> : <Loader/>
                }

                {/*<button className={'card-btn'}>Собрать</button>*/}
            </div>
        </div>
    )
}

export default OrderCard