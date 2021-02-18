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

    const reloadData = () => {
        setPrice(0.0)
        setName('')
        setCoefficient(0.0)
        setProductId('')
        setCategoryName('')
        setStorageAmount(0.0)
        setResourceListForOption([])
    }

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
        for (let resource in resource_dict) {
            resources_list.push({"id": resource, "amount": resource_dict[resource]})
        }

        dispatch(createResourceAction(name, product_id, price, coefficient, categoryName, resources_list, storageAmount));
        setActive(false);
        reloadData()
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
                  className={active ? 'spec-modal-content active' : 'spec-modal-content'}>
                <div className="spec-modal-title">Создать спецификацию</div>
                <div className="add-resource-wrapper">
                    <div className="spec-content-wrapper">
                        <div className="first-title">Блок создания</div>
                        <label htmlFor="name" className={'spec-modal-text'}>Название спецификации</label>
                        <input type="text" name="name" id="name"
                               className={'spec-modal-input'}
                               onChange={e => setName(e.target.value)}
                               value={name}/>
                        <label htmlFor="external_id" className={'spec-modal-text'}>ID продукта</label>
                        <input type="text" name="external_id" id="external_id"
                               className={'spec-modal-input'}
                               onChange={e => setProductId(e.target.value)}
                               value={product_id}/>
                        <label htmlFor="categoryName" className={'spec-modal-text'}>Название категории</label>
                        <input type="text" name="categoryName" id="categoryName"
                               className={'spec-modal-input'}
                               onChange={e => setCategoryName(e.target.value)}
                               value={categoryName}/>
                        <label htmlFor="storageAmount" className={'spec-modal-text'}>Название категории</label>
                        <input type="number" name="storageAmount" id="storageAmount"
                               className={'spec-modal-input'}
                               onChange={e => setStorageAmount(parseInt(e.target.value))}
                               value={storageAmount}/>
                        <label htmlFor="price" className={'spec-modal-text'}>Цена</label>
                        <input type="number" name="price" id="price"
                               className={'spec-modal-input'}
                               onChange={e => setPrice(parseFloat(e.target.value))}
                               value={price}/>
                        <label htmlFor="coefficient" className={'spec-modal-text'}>Коэффициент</label>
                        <input type="number" name="coefficient" id="coefficient"
                               className={'spec-modal-input'}
                               onChange={e => setCoefficient(parseFloat(e.target.value))}
                               value={coefficient}/>
                    </div>
                    <div className="add-block-resource">
                        <div className="second-title">Блок ресурсов</div>
                        {resourceListForOption.map(res => res)}
                        <button onClick={addResourceSelect} className={'add-spec-btn'}>Добавить ресурс в спецификацию</button>
                    </div>
                </div>
                <button className={'filter-btn'} type={'submit'}>Применить</button>
            </form>
        </div>
    )
}

export default CreateSpecificationModal