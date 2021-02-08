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
                <div className="resource-modal-title"><h2>Создать ресурс</h2></div>
                <br/>
                <div className="create-resource-wrapper">
                    <label htmlFor="name">Название ресурса</label><br/>
                    <input type="text" name="name" id="name"
                           onChange={e => setName(e.target.value)}
                           value={name}/><br/>
                    <label htmlFor="external_id">ID</label><br/>
                    <input type="text" name="external_id" id="external_id"
                           onChange={e => setExternalId(e.target.value)}
                           value={external_id}/><br/>
                    <label htmlFor="provider_name">Поставщик</label><br/>
                    <input type="text" name="provider_name" id="provider_name"
                           onChange={e => setProviderName(e.target.value)}
                           value={provider_name}/><br/>
                    <label htmlFor="cost">Цена</label><br/>
                    <input  type="number" step="0.01" name="cost" id="cost"
                           onChange={e => setCost(parseFloat(e.target.value))}
                           value={cost}/><br/>
                    <label htmlFor="amount">Количество</label><br/>
                    <input  type="number" step="0.01" name="amount" id="amount"
                           onChange={e => setAmount(parseFloat(e.target.value))}
                           value={amount}/><br/>
                </div>
                <button className={'filter-btn'} type={'submit'}>Применить</button>
            </form>
        </div>
    )
}

export default CreateResourceModal