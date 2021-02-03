import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { listProducts} from '../../actions/product-actions'
import Loader from "../../components/spinner";
import ErrorMessage from "../../components/error-message";

import './home-screen.scss'
import ProductItem from "../../components/product-item";

const HomeScreen = () => {

    const dispatch = useDispatch()
    const productList = useSelector( state => state.productList)
    const { error, loading, products } = productList


    useEffect(() => {
        dispatch(listProducts())
    })


    return (
        <div className="home-screen-wrapper">
            <div className="menu-wrapper">
                <div className="nav-item">ID</div>
                <div className="nav-item">Название</div>
                <div className="nav-item">Цена, руб</div>
                <div className="nav-item">Количество</div>
                <div className="nav-item">Поставщик</div>
                <div className="nav-item">Последнее изменение цены</div>
                <div className="nav-item">Последнее изменение количетсва</div>.
            </div>
            {
                loading ? <Loader/>
                    : error ? <ErrorMessage variant={'danger'}>{error}</ErrorMessage>
                    :
                    <div>
                        {
                            products.map(product => {
                                return <ProductItem key={product.id} product={product}/>
                            })
                        }
                    </div>
            }

        </div>
    )
}

export default HomeScreen