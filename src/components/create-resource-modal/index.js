import React, {useState} from 'react'

import './create-resource-modal.scss'
import {createResourceAction} from "../../actions/resource-create-actions";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../spinner";
import axiosAPI from "../api/axiosApi";
import {listProducts} from "../../actions/product-actions";


const CreateResourceModal = ({active, setActive}) => {

    const dispatch = useDispatch()

    const [cost, setCost] = useState(0.0);
    const [name, setName] = useState("");
    const [provider_name, setProviderName] = useState("");
    const [amount, setAmount] = useState(0.0);
    const [external_id, setExternalId] = useState("");
    const [amountLimit, setAmountLimit] = useState(10.0);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const reloadData = () => {
        setCost(0.0)
        setName('')
        setProviderName('')
        setAmount(0.0)
        setExternalId('')
        setAmountLimit((10.0))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        axiosAPI.post('resource/create/',
            {
                'name': name,
                'external_id': external_id,
                'provider_name': provider_name,
                'cost': cost,
                'amount': amount,
                'amount_limit': amountLimit
            }
        )
            .then(response => {
                setActive(false)
                dispatch(listProducts())
                reloadData()
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
                <div className="resource-modal-title">Создать ресурс</div>
                <br/>
                <div className="create-resource-wrapper">
                    <label htmlFor="name" className={'resource-create-title'}>Название ресурса</label>
                    {error && error.name ? <div>Некоректное значение</div> : null}
                    <input type="text" name="name" id="name"
                           className={'create-resource-input'}
                           onChange={e => setName(e.target.value)}
                           value={name}/>
                    <label htmlFor="external_id" className={'resource-create-title'}>ID</label>
                    {error && error.external_id ? <div>Некоректное значение</div> : null}
                    <input type="text" name="external_id" id="external_id"
                           className={'create-resource-input'}
                           onChange={e => setExternalId(e.target.value)}
                           value={external_id}/>
                    <label htmlFor="provider_name" className={'resource-create-title'}>Поставщик</label>
                    {error && error.provider_name ? <div>Некоректное значение</div> : null}
                    <input type="text" name="provider_name" id="provider_name"
                           className={'create-resource-input'}
                           onChange={e => setProviderName(e.target.value)}
                           value={provider_name}/>
                    <label htmlFor="cost" className={'resource-create-title'}>Цена</label>
                    {error && error.cost ? <div>Некоректное значение</div> : null}
                    <input type="number" step="0.01" name="cost" id="cost"
                           className={'create-resource-input'}
                           onChange={e => setCost(parseFloat(e.target.value))}
                           value={cost}/>
                    <label htmlFor="amount" className={'resource-create-title'}>Количество</label>
                    {error && error.amount ? <div>Некоректное значение</div> : null}
                    <input type="number" step="0.01" name="amount" id="amount"
                           className={'create-resource-input'}
                           onChange={e => setAmount(parseFloat(e.target.value))}
                           value={amount}/>
                    <label htmlFor="amountLimit" className={'resource-create-title'}>Минимальное критическое
                        значение</label>
                    {error && error.amount_limit ? <div>Некоректное значение</div> : null}
                    <input type="number" step="0.01" name="amountLimit" id="amountLimit"
                           className={'create-resource-input'}
                           onChange={e => setAmountLimit(parseFloat(e.target.value))}
                           value={amountLimit}/>
                </div>
                {loading ? <Loader/> : <button className={'filter-btn'} type={'submit'} onClick={setActive(false)}>Применить</button>}
            </form>
        </div>
    )
}

export default CreateResourceModal