import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import { changePriceAction } from '../../actions/price-actions'

import './product-item.scss'

const ProductItem = ({product}) => {

    const dispatch = useDispatch()

    const [price, setPrice] = useState(product.cost)
    const [selectCheckbox, setSelectCheckbox] = useState({})
    const [showDeleteBtn, setShowDeleteBtn] = useState(false)


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(changePriceAction(product.id, price))
    }


    const handleChange = (event) => {
        setSelectCheckbox({ 'checked': event.target.checked, 'id': product.id})
        setShowDeleteBtn(event.target.checked)
    }

    useEffect(() => {
        console.log('checkedItem', selectCheckbox, 'id', product.id)
        console.log(showDeleteBtn)
    }, [selectCheckbox])



    return (
        <div className="product-item-wrapper">
            <div className="item-wrapper">
                <input type={'checkbox'} className={'delete-checkbox'} checked={selectCheckbox[product.id]} onChange={handleChange}/>
                <div className="product-item id">{product.external_id}</div>
                <div className="product-item name">{product.name}</div>
                <form className="form-wrapper" onSubmit={submitHandler}>
                    <input
                           type={'number'}
                           name={'price'}
                           onChange={e => setPrice(e.target.value)}
                           value={parseInt(price)}
                           className={'product-item price'}/>
                    <button type={'submit'} >✓</button>
                </form>
                <div className="product-item count">{product.amount}</div>
                <div className="product-item diller">{product.provider ? product.provider.name : 'отсутствует'}</div>
                <div className="product-item last-price-change">{product.last_change_cost}</div>
                <div className="product-item last-count-change">{product.last_change_amount}</div>
            </div>
            <button className={showDeleteBtn ? 'delete-btn active' : 'delete-btn'}>Удалить</button>
        </div>
    )
}

export default ProductItem
