import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import './specification-item.scss'
import {removeSpecAction} from "../../actions/remove-specifications-actions";

const SpecificationItem = ({onSelect, specification}) => {
    const dispatch = useDispatch()
    const [selectCheckbox, setSelectCheckbox] = useState({})
    const [showDeleteBtn, setShowDeleteBtn] = useState(false)
    console.log(specification.price)

    const onClick = () => {
        onSelect(specification.id)
    }

    const deleteHandler = (e) => {
        e.stopPropagation()
        dispatch(removeSpecAction(specification.id))
    }

    const handleChange = (event) => {
        setSelectCheckbox({'checked': event.target.checked, 'id': specification.id})
        setShowDeleteBtn(event.target.checked)
    }

    return (
        <div className="specification-item-wrapper" onClick={onClick} id={specification.id}>
            <div className="item-wrapper">
                <div className={'id-wrapper'}>
                    <input
                        type={'checkbox'}
                        className={'delete-checkbox'}
                        checked={selectCheckbox[specification.id]}
                        onChange={handleChange}
                        onClick={e => e.stopPropagation()}/>
                    <div className="product-item id">{specification.product_id}</div>
                </div>
                <div className="product-item name">{specification.name}</div>
                <div
                    className="product-item cost-price">{specification.prime_cost ?
                    parseFloat(specification.prime_cost)
                    : 'нет'}
                </div>
                <div
                    className="product-item marja">{specification.prime_cost ?
                    ((parseFloat(specification.price) - parseFloat(specification.prime_cost)) / parseFloat(specification.price))
                        .toFixed(2) : 'нет'}
                </div>
                <div className="product-item coefficient">{parseFloat(specification.coefficient).toFixed(2)}</div>
                <div
                    className="product-item best-price">
                    {parseFloat(specification.coefficient * specification.prime_cost)
                    .toFixed(1)}
                </div>
               <div className="product-item price">{parseInt(specification.price)}</div>
                <div
                    className="product-item category">
                    {specification.category ? specification.category.name : 'нет'}
                </div>
                <form>
                    <button className={showDeleteBtn ? 'delete-btn active' : 'delete-btn'}
                            onClick={deleteHandler}
                    >Удалить</button>
                </form>
            </div>
        </div>
    )
}

export default SpecificationItem