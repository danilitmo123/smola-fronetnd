import React, {useEffect, useState} from 'react'
import './create-order-modal.scss'
import {createOrderAction} from "../../actions/order-create-actions";
import OrderProduct from "./order-product"
import {useDispatch, useSelector} from "react-redux";
import {shortlistSpecification} from "../../actions/specification-shortlist-actions"
import axiosAPI from "../api/axiosApi";
import {listOrders} from "../../actions/order-list-actions";
import Loader from "../spinner";


const CreateOrderModal = ({active, setActive}) => {

    const dispatch = useDispatch()

    const [productDict, setProductDict] = useState({})
    const [externalId, setExternalId] = useState("");
    const [source, setSource] = useState("");
    const [productListForOption, setProductListForOption] = useState([]);
    const [productList, setProductList] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [counter, setCounter] = useState(0);
    const {specificationsShortList} = useSelector(state => state.shortlistSpecification)

    const reloadData = () => {
        setSource('')
        setExternalId('')
        setProductListForOption([])
        setProductDict({})
        setProductList([])
        setError(null)
        setLoading(false)
    }

    useEffect(() => {
            dispatch(shortlistSpecification())
        }, [dispatch]
    )

    const addSpecificationToDict = id => {
        productDict[id] = 1;
    }

    const setSpecificationAmount = (id, amount) => {
        productDict[id] = amount
    }

    const changeSpecification = (old_id, new_id) => {
        productDict[new_id] = productDict[old_id]
        delete productDict[old_id]
    }

    const removeSpecification = (id, index) => {
        delete productDict[id]
        setProductListForOption([...productListForOption.slice(0, index), ...productListForOption.slice(index + 1)])
    }

    const submitHandler = (e) => {
        e.preventDefault()
        for (let product in productDict) {
            productList.push({"product_id": product, "amount": productDict[product]})
        }
        setLoading(true)
        axiosAPI.post(
            'order/create/',
            {
                'external_id': externalId,
                'source_name': source,
                'specifications_create': productList
            }
        )
            .then(response => {
                setActive(false)
                dispatch(listOrders())
                reloadData()
            })
            .catch(error => {
                setLoading(false)
                setError(error.response.data)
                setProductList([])
            })
    }

    const addProductSelect = e => {
        e.preventDefault()
        setCounter(counter + 1)
        const nextProductListForOption = [...productListForOption,
            (<OrderProduct number={productListForOption.length}
                           productList={specificationsShortList}
                           onAmountChange={setSpecificationAmount}
                           onProductAdd={addSpecificationToDict} index={counter}
                           remove={removeSpecification} change={changeSpecification}
            />)]
        setProductListForOption(nextProductListForOption)
    }


    return (
        <div onClick={() => setActive(false)} className={active ? 'order-modal active' : 'order-modal'}>
            <form onClick={e => e.stopPropagation()} onSubmit={submitHandler}
                  className={active ? 'order-modal-content active' : 'order-modal-content'}>
                <div className="order-modal-title"> Создать заказ</div>
                <div className="create-order-wrapper">
                    <div className="order-content-wrapper">
                        <div className="first-title">Блок создания</div>
                        <label htmlFor="externalId" className={'order-create-title'}>ID</label>
                        {error && error.external_id ? <div>Некоректное значение</div> : null}
                        <input type="text" name="externalId" id="externalId"
                               className={'create-order-input'}
                               onChange={e => setExternalId(e.target.value)}
                               value={externalId}/>
                        <label htmlFor="source" className={'order-create-title'}>Источник заказа</label>
                        {error && error.source_name ? <div>Некоректное значение</div> : null}
                        <input type="text" name="source" id="source"
                               className={'create-order-input'}
                               onChange={e => setSource(e.target.value)}
                               value={source}/>
                    </div>
                    <div className="add-block-order">
                        <div className="second-title">Блок продуктов</div>
                        {error && error.specifications_create ? <div>Некоректное значение</div> : null}
                        {productListForOption.map(product => product)}
                        {loading ? <Loader/> :
                            <button onClick={addProductSelect} className={'add-spec-btn'}>Добавить продукт в
                                заказ</button>}
                    </div>
                </div>
                <button className={'filter-btn'} type={'submit'}>Применить</button>
            </form>
        </div>
    )
}


export default CreateOrderModal;