import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {listSpecifications} from "../../actions/specification-actions";
import Loader from "../../components/spinner";
import ErrorMessage from "../../components/error-message";

import './specification-screen.scss'

import SpecificationItem from "../../components/specification-item";
import SpecificationCard from "../../components/specification-card";
import {switchSpecificationPageAction} from "../../actions/switch-page-actions";

const SpecificationScreen = () => {

    const dispatch = useDispatch()
    const specificationList = useSelector(state => state.specificationList)
    const {error, loading, specifications} = specificationList

    const [selectedItem, setSelectedItem] = useState(null)

    useEffect(() => {
        dispatch(listSpecifications())
    }, [dispatch])

    useEffect(()=>{
        dispatch(switchSpecificationPageAction())
    })
    const itemSelected = (value) => {
        if (selectedItem === value) {
            setSelectedItem(null)
        } else {
            setSelectedItem(value)
        }
    }

    return (
        <div className="specification-screen-wrapper">
            <div className="menu-wrapper">
                <div className="nav-item id">ID</div>
                <div className="nav-item name">Название</div>
                <div className="nav-item self-cost">Себестоимость</div>
                <div className="nav-item marja">Маржа</div>
                <div className="nav-item coefficient">Коэф наценки</div>
                <div className="nav-item best-price">Реком цена</div>
                <div className="nav-item now-price">Текущая цена</div>
                <div className="nav-item category">Категория</div>
                <div className="nav-item">ID продукта</div>
            </div>
            {
                loading ? <Loader/>
                    : error ? <ErrorMessage variant={'danger'}>{error}</ErrorMessage>
                    :
                    <div>
                        {
                            specifications?
                            Object.values(specifications).map(specification => {
                                return <SpecificationItem key={specification.id} onSelect={itemSelected}
                                                          specification={specification}/>
                            }) : null
                        }
                    </div>
            }
            <SpecificationCard
                active={selectedItem != null}
                specification={ specifications ?
                    Object.values(specifications)
                        .find(specification => specification.id === selectedItem): null
                }
            />
        </div>
    )
}

export default SpecificationScreen