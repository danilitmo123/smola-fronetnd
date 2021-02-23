import React, {useEffect, useState} from 'react'

import './create-order-modal.scss'
import {createOrderAction} from "../../actions/order-create-actions";
import OrderProduct from "./order-product"
import {useDispatch, useSelector} from "react-redux";
import {shortlistSpecification} from "../../actions/specification-shortlist-actions"


const CreateOrderModal = ({active, setActive}) => {

    const dispatch = useDispatch()

    const [productDict, setProductDict] = useState({})
    const [externalId, setExternalId] = useState("");
    const [source, setSource] = useState("");

    const [productListForOption, setProductListForOption] = useState([]);
    const [productList, _] = useState([]);

    const {error, loading, products} = useSelector(state => state.shortlistSpecification)

    useEffect(() => {
            dispatch(shortlistSpecification())
        }, [dispatch]
    )

    const reloadData = () => {
        setSource('')
        setExternalId('')
        setProductListForOption([])
        setProductDict({})
    }

    const submitHandler = (e) => {
        for (let product in productDict) {
            productList.push({"product_id": product, "amount": productDict[product]})
        }
        dispatch(createOrderAction(externalId, source,));
        setActive(false);
        reloadData()
    }

    const addProductToDict = id => {
        productDict[id] = null;
    }

    const setProductAmount = (id, amount) => {
        productDict[id] = amount
    }

    const addProductSelect = e => {
        e.preventDefault()
        const nextProductListForOption = [...productListForOption,
            (<OrderProduct  number={productListForOption.length}
                            productList={productList}
                            onAmountChange={setProductAmount}
                            onProductAdd={addProductToDict}
                            />)]
    setProductListForOption(nextProductListForOption)
    }


    return(
        <div onClick = {()=> setActive(false)}  className = {active ? 'order-modal active' : 'order-modal'} >
            <form   onClick = {e=> e.stopPropagation()} onSubmit = {submitHandler}
                    className = {active ? 'create-modal-content active' : 'create-modal-content'} >
                <div className = "order-modal-title" > Создать заказ </div>
                    <br/>
                    <div className="create-order-wrapper">
                        <label htmlFor="source" className={'resource-create-title'}>Источник заказа</label>
                        <input type="text" name="source" id="source"
                               className={'create-order-input'}
                               onChange={e => setSource(e.target.value)}
                               value={externalId}/>
                        <label htmlFor="externalId" className={'order-create-title'}>ID</label>
                        <input type="text" name="externalId" id="externalId"
                               className={'create-order-input'}
                               onChange={e => setExternalId(e.target.value)}
                               value={externalId}/>
                        <div className="add-block-order">
                            <div className="second-title">Блок родуктов</div>
                            {productListForOption.map(product => product)}
                            <button onClick={addProductSelect} className={'add-spec-btn'}>Добавить продукт в заказ</button>
                        </div>
                    </div>
                    <button className={'filter-btn'} type={'submit'}>Применить</button>
            </form>
        </div>
    )
}


export default CreateOrderModal