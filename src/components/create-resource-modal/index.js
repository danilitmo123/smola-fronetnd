import React, {useState} from 'react'

import './create-resource-modal.scss'
import {createResourceAction} from "../../actions/resource-create-actions";
import {useDispatch} from "react-redux";


const CreateResourceModal = ({active, setActive}) => {

    const dispatch = useDispatch()

    const [cost, setCost] = useState(0.0);
    const [name, setName] = useState("");
    const [provider_name, setProviderName] = useState("");
    const [amount, setAmount] = useState(0.0);
    const [external_id, setExternalId] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createResourceAction(name, external_id, provider_name, cost, amount));
        setActive(false);
        // document.location.reload();
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
                    <input type="text" name="name" id="name"
                           className={'create-resource-input'}
                           onChange={e => setName(e.target.value)}
                           value={name}/>
                    <label htmlFor="external_id" className={'resource-create-title'}>ID</label>
                    <input type="text" name="external_id" id="external_id"
                           className={'create-resource-input'}
                           onChange={e => setExternalId(e.target.value)}
                           value={external_id}/>
                    <label htmlFor="provider_name" className={'resource-create-title'}>Поставщик</label>
                    <input type="text" name="provider_name" id="provider_name"
                           className={'create-resource-input'}
                           onChange={e => setProviderName(e.target.value)}
                           value={provider_name}/>
                    <label htmlFor="cost" className={'resource-create-title'}>Цена</label>
                    <input  type="number" step="0.01" name="cost" id="cost"
                            className={'create-resource-input'}
                           onChange={e => setCost(parseFloat(e.target.value))}
                           value={cost}/>
                    <label htmlFor="amount" className={'resource-create-title'}>Количество</label>
                    <input  type="number" step="0.01" name="amount" id="amount"
                            className={'create-resource-input'}
                           onChange={e => setAmount(parseFloat(e.target.value))}
                           value={amount}/>
                </div>
                <button className={'filter-btn'} type={'submit'}>Применить</button>
            </form>
        </div>
    )
}

export default CreateResourceModal