import React, {useState} from 'react'

import './order-product.scss'


const OrderProduct = ({number, productList, onProductAdd, onAmountChange, index, remove, change}) => {

    const [productId, setProductId] = useState(null);
    const [amount, setAmount] = useState(1);
    const [activeAmount, setActiveAmount] = useState(false)
    const [value, setValue] = useState("")
    const [indx, setIndex] =  useState(index)

    const changeProductId = (newProductId) => {
        if (productId == null){
            addProduct(newProductId)
        }else{
            change(productId, newProductId)
            setProductId(newProductId)
        }
    }

    const addProduct = (id) => {
        setProductId(id);
        setValue(value);
        setActiveAmount(true);
        onProductAdd(id);
    }

    const setProductAmount = (id, amount) => {
        setAmount(amount);
        onAmountChange(id, amount)
    }

    return (
        <div className={"option"}>
            <div>
                <label htmlFor={"product-" + number + "-id"} className={'title-order-product'}>Продукт {number}</label>
                <select name={"product-" + number + "-id"} id={"product-" + number + "-id"}
                        onChange={e => changeProductId(e.target.value)} value={productId} className={'resource-select'}>
                    <option name={"default-option-" + number} key={"default-option-" + number}
                            id={"default-option-" + number} value="----">----</option>
                    {Object.values(productList).map(product => {
                            return <option name={"product-" + product.id + "-option"}
                                           id={"product-" + product.id + "-option"}
                                           value={product.product_id}
                                           key={"product-" + product.id + "-option"}>{product.name} - {product.id}</option>
                        }
                    )}
                </select>
            </div>
            <div>
                <label htmlFor={"product-" + number + "-amount"}
                       className={'title-order-product title-count'}>Количество</label>
                <input type="number" name={"product-" + number + "-amount"} id={"product-" + number + "-amount"}
                       disabled={!activeAmount}
                       value={amount}
                       className={'resource-amount-input'}
                       onChange={e => setProductAmount(productId, e.target.value)}/>
            </div>
            <div>
                <button onClick={e => remove(productId, indx)}>x</button>
            </div>
        </div>
    )
}

export default OrderProduct