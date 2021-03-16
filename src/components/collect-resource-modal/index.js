import React, {useState} from 'react'

import './collect-resource-modal.scss'
import {useDispatch, useSelector} from "react-redux";
import Loader from "../spinner";
import axiosAPI from "../api/axiosApi";
import {listProducts} from "../../actions/product-actions";


const CollectResourceModal = ({active, setActive, initData, deactivateResourceModal}) => {

    const dispatch = useDispatch()

    console.log({active})

    const [name, setName] = useState(initData.name);
    const [provider_name, setProviderName] = useState(initData.providerName);
    const [amount, setAmount] = useState(0);
    const [timeStamp, setTimeStamp] = useState(Date.now());
    const [comment, setComment] = useState('');
    const [cost, setCost] = useState(initData.cost)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const reloadData = () => {
        setName('')
        setProviderName('')
        setAmount(0.0)
        setTimeStamp(Date.now())
        setComment('')
        setCost(0)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        console.log({name, provider_name, amount, timeStamp, comment, cost})
        axiosAPI.post('resource/delivery/',
            {
                'resource': initData.id,
                'name': name,
                'provider_name': provider_name,
                'amount': amount,
                'time_stamp': new Date(timeStamp).toISOString().substring(0, 10),
                'comment': comment,
                'cost': cost
            }
        )
            .then(response => {
                setActive(false)
                deactivateResourceModal()
                dispatch(listProducts())
                reloadData()
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                setError(error.response.data)
                console.log(error.response.data)
            })
    }

    return (
        <div
            onClick={() => {setActive(false); deactivateResourceModal()}}
            className={active ? 'resource-modal active' : 'resource-modal'}>
            <form onClick={e => e.stopPropagation()} onSubmit={submitHandler}
                  className={active ? 'create-modal-content active' : 'create-modal-content'}>
                <div className="resource-modal-title">Собрать ресурс</div>
                <br/>
                <div className="create-resource-wrapper">
                    <label htmlFor="name" className={'resource-create-title'}>Именование</label>
                    {error && error.name ? <div>Некоректное значение</div> : null}
                    <input type="text" name="name" id="name"
                           className={'create-resource-input'}
                           onChange={e => setName(e.target.value)}
                           value={name}/>
                    <label htmlFor="provider_name" className={'resource-create-title'}>Поставщик</label>
                    {error && error.provider_name ? <div>Некоректное значение</div> : null}
                    <input type="text" name="provider_name" id="provider_name"
                           className={'create-resource-input'}
                           onChange={e => setProviderName(e.target.value)}
                           value={provider_name}/>
                    <label htmlFor="cost" className={'resource-create-title'}>Цена поставки</label>
                    {error && error.cost ? <div>Некоректное значение</div> : null}
                    <input type="number" step="0.01" name="cost" id="cost"
                           className={'create-resource-input'}
                           onChange={e => setCost(parseFloat(e.target.value))}
                           value={cost}/>
                    <label htmlFor="amount" className={'resource-create-title'}>Количество в поставке</label>
                    {error && error.amount ? <div>Некоректное значение</div> : null}
                    <input type="number" step="0.01" name="amount" id="amount"
                           className={'create-resource-input'}
                           onChange={e => setAmount(parseFloat(e.target.value))}
                           value={amount}/>
                    <label htmlFor="time_stamp" className={'resource-create-title'}>Дата поставки</label>
                    <input type="date" name={'time_stamp'} id={'time_stamp'}
                           className={'create-resource-input'}
                           onChange={e => setTimeStamp(e.target.value)}
                           value={timeStamp}/>
                    <label htmlFor="comment" className={'resource-create-title'}>Комментарий</label>
                    <input type="text" name={'comment'} id={'comment'}
                           className={'create-resource-input'}
                           onChange={e => setComment(e.target.value)}
                           value={comment}/>

                </div>
                {loading ? <Loader/> : <button className={'filter-btn'} type={'submit'}>Применить</button>}
            </form>
        </div>
    )
}

export default CollectResourceModal