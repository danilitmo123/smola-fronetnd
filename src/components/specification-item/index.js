import React, {useState} from 'react'
import {useDispatch} from "react-redux";

import './specification-item.scss'
import {changeSpecPriceAction} from "../../actions/specification-price-actions";
import {changeCoefficientAction} from '../../actions/coefficient-actions'
import {removeSpecAction} from "../../actions/remove-specifications-actions";

const SpecificationItem = ({onSelect, specification}) => {
  const dispatch = useDispatch()
  const [coefficient, setCoefficient] = useState(specification.coefficient)
  const [price, setPrice] = useState(specification.price)
  const [bestPrice, setBestPrice] = useState(specification.prime_cost * coefficient)
  const [selectCheckbox, setSelectCheckbox] = useState({})
  const [showDeleteBtn, setShowDeleteBtn] = useState(false)



  const submitCoefficientHandler = (e) => {
    e.preventDefault()
    dispatch(changeCoefficientAction(specification.id, coefficient))
  }

  const submitPriceHandler = (e) =>{
    e.preventDefault()
    dispatch(changeSpecPriceAction(specification.id, price))
  }

  const onClick = () => {
    // setCardActive(true)
    console.log(specification.id)
    onSelect(specification.id)
  }

  const deleteHandler = (e) => {
    e.stopPropagation()
    dispatch(removeSpecAction(specification.id))
  }

  const handleChange = (event) => {
    setSelectCheckbox({'checked': event.target.checked, 'id': specification.id})
    setShowDeleteBtn(event.target.checked)
  }

  console.log(specification)

  return (
      <div className="specification-item-wrapper" onClick={onClick} id={specification.id}>
        <div className="item-wrapper">
          <div className={'id-wrapper'}>
            <input
                type={'checkbox'}
                className={'delete-checkbox'}
                checked={selectCheckbox[specification.id]}
                onChange={handleChange}
                onClick={e => e.stopPropagation()}/>
            <div className="product-item id">{specification.id}</div>
          </div>
          <div className="product-item name">{specification.name}</div>
          <div className="product-item cost-price">{specification.prime_cost ? parseInt(specification.prime_cost) : 'нет'}</div>

          <div className="product-item marja">{specification.prime_cost ? ((parseFloat(price) - parseFloat(specification.prime_cost)) / parseFloat(price)).toFixed(2) : 'нет'}</div>
          <form className="form-wrapper" onSubmit={submitCoefficientHandler}>
            <input
                type={'number'}
                name={'coefficient'}
                onChange={e => setCoefficient(e.target.value)}
                value={parseFloat(coefficient)}
                className={'product-item price'}
                onClick={e => e.stopPropagation()}/>
            <button type={'submit'} onClick={e => e.stopPropagation()} className={'confirm-button'}>✓</button>
          </form>
          <div className="product-item best-price">{parseInt(bestPrice)}</div>
          <form className="form-wrapper" onSubmit={submitPriceHandler}>
            <input
                type={'number'}
                name={'price'}
                onChange={e => setPrice(e.target.value)}
                value={parseFloat(price)}
                className={'product-item price'}
                onClick={e => e.stopPropagation()}/>
            <button type={'submit price-submit'} onClick={e => e.stopPropagation()} className={'confirm-button-second'}>✓</button>
          </form>
          <div className="product-item category">{specification.category ? specification.category.name : 'нет'}</div>
          <div className="product-item product_id">{specification.product_id}</div>
          <form>
            <button className={showDeleteBtn ? 'delete-btn active' : 'delete-btn'} onClick={deleteHandler}>Удалить</button>
          </form>
        </div>
      </div>
  )
}

export default SpecificationItem