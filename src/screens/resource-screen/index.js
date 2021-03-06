import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from '../../actions/product-actions'
import Loader from "../../components/spinner";
import ErrorMessage from "../../components/error-message";

import './home-screen.scss'
import ProductItem from "../../components/product-item";
import {switchResourcePageAction} from "../../actions/switch-page-actions";
import CollectResourceModal from "../../components/collect-resource-modal";

const ResourceScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList
    const [activeResourceModal, setActiveResourceModal] = useState(true)
    const [resourceDeliveryModalData, setResourceDeliveryModalData] = useState([])

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    useEffect(() => {
        dispatch(switchResourcePageAction())
    })

    const activateDeliveryModal = (data) => {
        setResourceDeliveryModalData([data])
        setActiveResourceModal(true)
    }
    const deactivateDeliveryModal = () => {
        setResourceDeliveryModalData([])
        setActiveResourceModal(false)
    }

    return (
        <div
            className="home-screen-wrapper">
            <div
                className="menu-wrapper">
                <div
                    className="nav-item id"> ID
                </div>
                <div className="nav-item name">Название</div>
                <div className="nav-item">Цена</div>
                <div className="nav-item count">Количество</div>
                <div className="nav-item">Поставщик</div>
                <div className="nav-item last-change-price">Последняя дата поставки</div>
                <div className="nav-item comment">Коммент</div>
            </div>
            {
                loading ? <Loader/>
                    : error ? <ErrorMessage variant={'danger'}>{error}</ErrorMessage>
                    :
                    <div>
                        {
                            Object.values(products).map(product => {
                                return <ProductItem product={product} activateResourceModal={activateDeliveryModal}
                                                    deactivateResourceModal={deactivateDeliveryModal}/>
                            })
                        }
                    </div>
            }
            {Object.values(resourceDeliveryModalData).map(data => {
                return <CollectResourceModal active={activeResourceModal}
                                             setActive={setActiveResourceModal} initData={data}
                                             deactivateResourceModal={deactivateDeliveryModal}
                />
            })
            }
        </div>
    )
}

export default ResourceScreen