import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {listSpecifications} from "../../actions/specification-actions";
import Loader from "../../components/spinner";
import ErrorMessage from "../../components/error-message";

import './specification-screen.scss'

import SpecificationItem from "../../components/specification-item";

const SpecificationScreen = () => {

    const dispatch = useDispatch()
    const specificationList = useSelector( state => state.specificationList)
    const { error, loading, specifications } = specificationList

    useEffect(() => {
        dispatch(listSpecifications())
    }, [dispatch])


    return (
        <div className="specification-screen-wrapper">
            <div className="menu-wrapper">
                <div className="nav-item">ID</div>
                <div className="nav-item">Название</div>
                <div className="nav-item">Себестоимость</div>
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
                                return <SpecificationItem key={specification.id} specification={specification}/>
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default SpecificationScreen