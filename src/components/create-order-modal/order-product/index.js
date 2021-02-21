import React, {useState} from 'react'

import './order-product.scss'


const OrderProduct = ({number, productList, onProductAdd, onAmountChange}) => {

    const [productId, setProductId] = useState("");
    const [amount, setAmount] = useState(0);
    const [activeAmount, setActiveAmount] = useState(false)
    const [value, setValue] = useState("")

    const addResource = (id) => {
        setProductId(id);
        setValue(value);
        setActiveAmount(true);
        onProductAdd(id);
    }

    const setResourceAmount = (id, amount) => {
        setAmount(amount);
        onAmountChange(id, amount)
    }

    return (
        <div className={"option"}>
            <div>
                <label htmlFor={"order-" + number + "-id"} className={'title-order-product'}>Продукт {number}</label>
                <select name={"order-" + number + "-id"} id={"order-" + number + "-id"}
                        onChange={e => addResource(e.target.value)} value={productId} className={'resource-select'}>
                    <option name={"default-option-" + number} key={"default-option-" + number}
                            id={"default-option-" + number} value="----">----</option>
                    {Object.values(productList).map(product => {
                            return <option name={"resource-" + product.id + "-option"}
                                           id={"resource-" + product.id + "-option"}
                                           value={product.product_id}
                                           key={"resource-" + product.id + "-option"}>{product.name} - {product.id}</option>
                        }
                    )}
                </select>
            </div>
            <div>
                <label htmlFor={"order-" + number + "-amount"}
                       className={'title-order-product title-count'}>Количество</label>
                <input type="number" name={"order-" + number + "-amount"} id={"order-" + number + "-amount"}
                       disabled={!activeAmount}
                       value={amount}
                       className={'resource-amount-input'}
                       onChange={e => setResourceAmount(productId, e.target.value)}/>
            </div>
        </div>
    )
}

export default OrderProduct