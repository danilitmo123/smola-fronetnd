import React, {useEffect, useState} from 'react'

import './create-specification-modal.scss'
import {listSpecifications} from "../../actions/specification-actions"
import {useDispatch, useSelector} from "react-redux";
import SpecificationResource from "./specification-resource"
import {shortlistResources} from "../../actions/resource-shortlist-actions"
import Loader from "../spinner";
import axiosAPI from "../api/axiosApi";

const CreateSpecificationModal = ({active, setActive}) => {

    const dispatch = useDispatch()
    const [resource_dict, setResourceDict] = useState({});
    const [price, setPrice] = useState(0.0);
    const [name, setName] = useState("");
    const [coefficient, setCoefficient] = useState(0.0);
    const [product_id, setProductId] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [resources_list, setResourceList] = useState([]);
    const [resourceListForOption, setResourceListForOption] = useState([]);
    const [storageAmount, setStorageAmount] = useState(0);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [counter, setCounter] = useState(0)
    const resourceList = useSelector(state => state.resourcesShortlist)
    const {resourceShortList} = resourceList

    const reloadData = () => {
        setPrice(0.0)
        setName('')
        setCoefficient(0.0)
        setProductId('')
        setCategoryName('')
        setStorageAmount(0.0)
        setResourceListForOption([])
        setResourceList([])
        setResourceDict({})
        setError(null)
        setLoading(false)
    }

    useEffect(() => {
        dispatch(shortlistResources())
    }, [dispatch])

    const addResourceToDict = id => {
        resource_dict[id] = 1;
    }

    const setResourceAmount = (id, amount) => {
        resource_dict[id] = amount;
    }

    const changeResource = (old_id, new_id) => {
        resource_dict[new_id] = resource_dict[old_id]
        delete resource_dict[old_id]
    }

    const removeResource = (id, index) => {
        delete resource_dict[id]
        setResourceListForOption([...resourceListForOption.slice(0, index), ...resourceListForOption.slice(index + 1)])
    }

    const submitHandler = (e) => {
        e.preventDefault()
        for (let resource in resource_dict) {
            resources_list.push({"id": resource, "amount": resource_dict[resource]})
        }
        console.log(resources_list)
        setLoading(true)
        axiosAPI.post(
            'specification/create/',
            {
                'name': name,
                'product_id': product_id,
                'price': price,
                'coefficient': coefficient,
                'category_name': categoryName,
                'resources_create': resources_list,
                'amount': storageAmount
            }
        )
            .then(response => {
                setActive(false)
                dispatch(listSpecifications())
                reloadData()
            })
            .catch(error => {
                setLoading(false)
                setError(error.response.data)
                setResourceList([])
            });
    }


    const addResourceSelect = e => {
        e.preventDefault();
        setCounter(counter + 1)
        const nextResourceListForOption = [...resourceListForOption,
            (<SpecificationResource number={resourceListForOption.length}
                                    resourceList={resourceShortList} onAmountChange={setResourceAmount}
                                    onResourceAdd={addResourceToDict} index={counter} remove={removeResource} change={changeResource}/>)]
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
                        {error && error.name ? <div>Некоректное значение</div> : null}
                        <input type="text" name="name" id="name"
                               className={'spec-modal-input'}
                               onChange={e => setName(e.target.value)}
                               value={name}/>
                        <label htmlFor="external_id" className={'spec-modal-text'}>ID продукта</label>
                        {error && error.product_id ? <div>Некоректное значение</div> : null}
                        <input type="text" name="productId" id="productId"
                               className={'spec-modal-input'}
                               onChange={e => setProductId(e.target.value)}
                               value={product_id}/>
                        <label htmlFor="categoryName" className={'spec-modal-text'}>Название категории</label>
                        {error && error.category_name ? <div>Некоректное значение</div> : null}
                        <input type="text" name="categoryName" id="categoryName"
                               className={'spec-modal-input'}
                               onChange={e => setCategoryName(e.target.value)}
                               value={categoryName}/>
                        <label htmlFor="storageAmount" className={'spec-modal-text'}>Готовых на складе</label>
                        {error && error.amount ? <div>Некоректное значение</div> : null}
                        <input type="number" name="storageAmount" id="storageAmount"
                               className={'spec-modal-input'}
                               onChange={e => setStorageAmount(parseInt(e.target.value))}
                               value={storageAmount}/>
                        <label htmlFor="price" className={'spec-modal-text'}>Цена</label>
                        {error && error.price ? <div>Некоректное значение</div> : null}
                        <input type="number" name="price" id="price"
                               className={'spec-modal-input'}
                               onChange={e => setPrice(parseFloat(e.target.value))}
                               value={price}/>
                        <label htmlFor="coefficient" className={'spec-modal-text'}>Коэффициент</label>
                        {error && error.coefficient ? <div>Некоректное значение</div> : null}
                        <input type="number" name="coefficient" id="coefficient"
                               className={'spec-modal-input'}
                               onChange={e => setCoefficient(parseFloat(e.target.value))}
                               value={coefficient}/>
                    </div>
                    <div className="add-block-resource">
                        <div className="second-title">Блок ресурсов</div>
                        {error && error.resources_create ? <div>Некоректное значение</div> : null}
                        {resourceListForOption.map(res => res)}
                        <button onClick={addResourceSelect} className={'add-spec-btn'}>Добавить ресурс в спецификацию
                        </button>
                    </div>
                </div>
                <div>
                    {loading ? <Loader/> : <button className={'filter-btn'} type={'submit'} onClick={setActive(false)}>Применить</button>}
                </div>
            </form>
        </div>
    )
}

export default CreateSpecificationModal