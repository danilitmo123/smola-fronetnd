import React, {useState} from 'react'
import {useDispatch} from "react-redux";

import './specification-item.scss'
import {changeSpecPriceAction} from "../../actions/specification-price-actions";
import {changeCoefficientAction} from '../../actions/coefficient-actions'

const SpecificationItem = ({specification}) => {

    const dispatch = useDispatch()
    const [coefficient, setCoefficient] = useState(specification.coefficient)
    const [price, setPrice] = useState(specification.price)
    const [bestPrice, setBestPrice] = useState(specification.prime_cost * coefficient)



    const submitCoefficientHandler = (e) => {
        e.preventDefault()
        dispatch(changeCoefficientAction(specification.id, coefficient))
    }

    const submitPriceHandler = (e) =>{
        e.preventDefault()
        dispatch(changeSpecPriceAction(specification.id, price))
    }


    return (
        <div className="specification-item-wrapper">
            <div className="item-wrapper">
                <div className="product-item id">{specification.product_id}</div>
                <div className="product-item name">{specification.name}</div>
                <div className="product-item cost-price">{parseInt(specification.prime_cost)}</div>
                <form className="form-wrapper" onSubmit={submitCoefficientHandler}>
                    <input
                        type={'number'}
                        name={'coefficient'}
                        onChange={e => setCoefficient(e.target.value)}
                        value={parseFloat(coefficient)}
                        className={'product-item price'}/>
                    <button type={'submit'}>✓</button>
                </form>
                <div className="product-item best-price">{parseInt(bestPrice)}</div>
                <form className="form-wrapper" onSubmit={submitPriceHandler}>
                    <input
                        type={'number'}
                        name={'price'}
                        onChange={e => setPrice(e.target.value)}
                        value={parseFloat(price)}
                        className={'product-item price'}/>
                    <button type={'submit'} >✓</button>
                </form>
                <div className="product-item category">{}</div>
                <div className="product-item product_id">{specification.product_id}</div>
            </div>
        </div>
    )
}

export default SpecificationItem