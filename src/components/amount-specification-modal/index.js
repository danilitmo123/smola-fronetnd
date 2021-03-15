import React, {useState} from 'react'

import './amount-specification-modal.scss'
import {useDispatch, useSelector} from "react-redux";
import Loader from "../spinner";
import axiosAPI from "../api/axiosApi";
import {listProducts} from "../../actions/product-actions";


const AmountSpecificationModal = ({active, setActive, id}) => {

  const dispatch = useDispatch()
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const reloadData = () => {
    setAmount(0.0)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    setLoading(true)
    axiosAPI.post('specification/build-set/',
        {
          'id': id,
          'amount': amount,
        }
    )
        .then(response => {
          setActive(false)
          dispatch(listProducts())
          reloadData()
          setLoading(false)
        })
        .catch(error => {
          setLoading(false)
          setError(error.response.data)
        })
  }

  return (
      <div
          onClick={() => setActive(false)}
          className={active ? 'resource-modal active' : 'resource-modal'}>
        <form onClick={e => e.stopPropagation()} onSubmit={submitHandler}
              className={active ? 'create-modal-content active' : 'create-modal-content'}>
          <div className="resource-modal-title">Собрать ресурс</div>
          <br/>
            <label htmlFor="amount" className={'resource-create-title'}>Количество</label>
            {error && error.amount ? <div>Некоректное значение</div> : null}
            <input type="number" step="0.01" name="amount" id="amount"
                   className={'amount-specification-input'}
                   onChange={e => setAmount(parseFloat(e.target.value))}
                   value={amount}/>
          {loading ? <Loader/> : <button className={'filter-btn'} type={'submit'}>Применить</button>}
        </form>
      </div>
  )
}

export default AmountSpecificationModal