import React, {useEffect, useState} from 'react'

import './create-specification-modal.scss'
import {createResourceAction} from "../../actions/specification-create-actions";
import {useDispatch, useSelector} from "react-redux";
import SpecificationResource from "./specification-resource"
import {shortlistResources} from "../../actions/resource-shortlist-actions"


const CreateSpecificationModal = ({active, setActive}) => {

    const dispatch = useDispatch()
    const [resource_dict, setResourceDict] = useState({});
    const [price, setPrice] = useState(0.0);
    const [name, setName] = useState("");
    const [coefficient, setCoefficient] = useState(0.0);
    const [product_id, setProductId] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [resources_list, _] = useState([]);
    const [resourceListForOption, setResourceListForOption] = useState([]);
    const [storageAmount, setStorageAmount] = useState(0);

    const resourceList = useSelector(state => state.resourcesShortlist)
    const {error, loading, resources} = resourceList

    useEffect(() => {
        dispatch(shortlistResources())
    }, [dispatch])


    const addResourceToDict = id => {
        resource_dict[id] =  null;
    }

    const setResourceAmount = (id, amount) => {
        resource_dict[id] = amount;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        for (let resource in resource_dict) {
            resources_list.push({"id": resource, "amount": resource_dict[resource]})
        }

        dispatch(createResourceAction(name, product_id, price, coefficient, categoryName, resources_list, storageAmount));
        setActive(false);
    }


    const addResourceSelect = e => {
        e.preventDefault();
        const nextResourceListForOption = [...resourceListForOption,
            (<SpecificationResource number={resourceListForOption.length}
                                    resourceList={resources} onAmountChange={setResourceAmount}
                                    onResourceAdd={addResourceToDict}/>)]
        setResourceListForOption(nextResourceListForOption)
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
                    <label htmlFor="name">Название спецификации</label><br/>
                    <input type="text" name="name" id="name"
                           onChange={e => setName(e.target.value)}
                           value={name}/><br/>
                    <label htmlFor="external_id">ID продукта</label><br/>
                    <input type="text" name="external_id" id="external_id"
                           onChange={e => setProductId(e.target.value)}
                           value={product_id}/><br/>
                    <label htmlFor="categoryName">Название категории</label><br/>
                    <input type="text" name="categoryName" id="categoryName"
                           onChange={e => setCategoryName(e.target.value)}
                           value={categoryName}/><br/>
                    <label htmlFor="storageAmount">Количесество</label><br/>
                    <input type="number" name="storageAmount" id="storageAmount"
                           onChange={e => setStorageAmount(parseInt(e.target.value))}
                           value={storageAmount}/><br/>
                    <label htmlFor="price">Цена</label><br/>
                    <input type="number" name="price" id="price"
                           onChange={e => setPrice(parseFloat(e.target.value))}
                           value={price}/><br/>
                    <label htmlFor="coefficient">Коефициент</label><br/>
                    <input type="number" name="coefficient" id="coefficient"
                           onChange={e => setCoefficient(parseFloat(e.target.value))}
                           value={coefficient}/><br/>
                    {resourceListForOption.map(res => res)}
                    <button onClick={addResourceSelect}>Добавить +</button>
                </div>
                <button className={'filter-btn'} type={'submit'}>Применить
                </button>
            </form>
        </div>
    )
}

export default CreateSpecificationModal