import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {changePriceAction} from '../../actions/price-actions'
import {removeAction} from "../../actions/remove-resources-actions";

import './product-item.scss'
import CollectResourceModal from "../collect-resource-modal";

const ProductItem = ({product, activateResourceModal}) => {

    const dispatch = useDispatch()
    const [price, setPrice] = useState(product.cost)
    const [selectCheckbox, setSelectCheckbox] = useState({})
    const [showDeleteBtn, setShowDeleteBtn] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(changePriceAction(product.id, price))
    }

    const dateCount = new Date(product.last_change_amount)

    const getZero = (num) => {
        if (num >= 0 && num < 10) {
            return '0' + num
        } else {
            return num
        }
    }

    const getDate = (date) => {
        if (date) {
            const year = date.getFullYear()
            let month = getZero(date.getMonth() + 1)
            let day = getZero(date.getDate())
            return `${day}-${month}-${year}`
        } else {
            return '==//=='
        }
    }

    const deleteHandler = (e) => {
        e.preventDefault()
        dispatch(removeAction(product.id))
    }

    const handleChange = (event) => {
        setSelectCheckbox({'checked': event.target.checked, 'id': product.id})
        setShowDeleteBtn(event.target.checked)
    }

    const activateResourceAmount = (resource) => {
        let data = {
            "name": resource.name,
            "providerName": resource.provider ? resource.provider.name: "",
            "cost": resource.cost,
            "id": resource.id
        }
        activateResourceModal(data)
    }

    return (
        <div className="product-item-wrapper">
            <div className="item-wrapper">
                <input type={'checkbox'} className={'delete-checkbox'} checked={selectCheckbox[product.id]}
                       onChange={handleChange}/>
                <div className="product-item id">{product.external_id}</div>
                <div className="product-item name">{product.name}</div>
                {/*<form className="form-wrapper" onSubmit={submitHandler}>*/}
                {/*    <input*/}
                {/*        type={'number'}*/}
                {/*        name={'price'}*/}
                {/*        onChange={e => setPrice(e.target.value)}*/}
                {/*        value={parseFloat(price).toFixed(2)}*/}
                {/*        className={'product-item price'}/>*/}
                {/*    <button type={'submit'} className={'confirm-btn'}>✓</button>*/}
                {/*</form>*/}
                <div className={'product-item price'}>{price ? parseFloat(price).toFixed(2): 0}</div>
                <div className="product-item count">{product.amount ? parseFloat(product.amount) : 0}</div>
                <div className="product-item diller">{product.provider ? product.provider.name : 'нет'}</div>
                <div className="product-item last-count-change">{getDate(dateCount)}</div>
                <div className={'product-item comment'}>{product.comment ? product.comment : 'нет'}</div>
            </div>
            <form>
                <button className={showDeleteBtn ? 'delete-btn active' : 'delete-btn'} onClick={deleteHandler}>Удалить
                </button>
            </form>
            <button onClick={() => activateResourceAmount(product)} className={'collect-btn'}>Добавить</button>
        </div>
    )
}

export default ProductItem