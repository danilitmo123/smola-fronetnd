import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {listSpecifications} from "../../actions/specification-actions";
import Loader from "../../components/spinner";
import ErrorMessage from "../../components/error-message";

import './specification-screen.scss'

import SpecificationItem from "../../components/specification-item";
import SpecificationCard from "../../components/specification-card";

const SpecificationScreen = () => {

    const dispatch = useDispatch()
    const specificationList = useSelector(state => state.specificationList)
    const {error, loading, specifications} = specificationList

    const [selectedItem, setSelectedItem] = useState(null)

    useEffect(() => {
        dispatch(listSpecifications())
    }, [dispatch])

    const itemSelected = (value) => {
        if (selectedItem === value) {
            setSelectedItem(null)
        } else {
            setSelectedItem(value)
        }
    }
    console.log("SPEC SCREEN render " + new Date())

    return (
        <div className="specification-screen-wrapper">
            <div className="menu-wrapper">
                <div className="nav-item id">ID</div>
                <div className="nav-item">Название</div>
                <div className="nav-item">Себестоимость</div>
                <div className="nav-item">Маржа</div>
                <div className="nav-item">Коэф наценки</div>
                <div className="nav-item">Реком цена</div>
                <div className="nav-item">Текущая цена</div>
                <div className="nav-item">Категория</div>
                <div className="nav-item">ID продукта</div>
            </div>
            {
                loading ? <Loader/>
                    : error ? <ErrorMessage variant={'danger'}>{error}</ErrorMessage>
                    :
                    <div>
                        {
                            Object.values(specifications).map(specification => {
                                return <SpecificationItem key={specification.id} onSelect={itemSelected}
                                                          specification={specification}/>
                            })
                        }
                    </div>
            }
            <SpecificationCard
                active={selectedItem != null}
                specification={
                    Object.values(specifications)
                        .find(specification => specification.id === selectedItem)
                }
            />
        </div>
    )
}

export default SpecificationScreen