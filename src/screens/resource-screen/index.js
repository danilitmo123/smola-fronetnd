import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { listProducts} from '../../actions/product-actions'
import Loader from "../../components/spinner";
import ErrorMessage from "../../components/error-message";

import './home-screen.scss'
import ProductItem from "../../components/product-item";
import {switchResourcePageAction} from "../../actions/switch-page-actions";

const ResourceScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector( state => state.productList)
    const { error, loading, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    useEffect(()=>{
        dispatch(switchResourcePageAction())
    })
    console.log("RES SCREEN render " + new Date())

    return (
        <div className="home-screen-wrapper">
            <div className="menu-wrapper">
                <div className="nav-item id">ID ресурса</div>
                <div className="nav-item name">Название</div>
                <div className="nav-item">Цена, руб</div>
                <div className="nav-item count">Количество</div>
                <div className="nav-item">Поставщик</div>
                <div className="nav-item last-change-price">Последнее изменение цены</div>
                <div className="nav-item last-change-count">Последнее <br/> изменение количетсва</div>
            </div>
            {
                loading ? <Loader/>
                    : error ? <ErrorMessage variant={'danger'}>{error}</ErrorMessage>
                    :
                    <div>
                        {
                            Object.values(products).map(product => {
                                return <ProductItem  key={product.id} product={product}/>
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default ResourceScreen