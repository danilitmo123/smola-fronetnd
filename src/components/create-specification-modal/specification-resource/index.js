import React, {useState} from 'react'

import './specification-resource.scss'


const SpecificationResource = ({number, resourceList, onResourceAdd, onAmountChange}) => {

    const [id, setId] = useState("");
    const [amount, setAmount] = useState(0);
    const [activeAmount, setActiveAmount] = useState(false)
    const [value, setValue] = useState("")

    const addResource = (id) => {
        setId(id);
        setValue(value);
        setActiveAmount(true);
        onResourceAdd(id);
    }

    const setResourceAmount = (id, amount) => {
        setAmount(amount);
        onAmountChange(id, amount)
    }

    return (
        <div className={"option"}>
            <div>
                <label htmlFor={"resource-" + number + "-id"} className={'title-spec-resource'}>Ресурс {number}</label>
                <select name={"resource-" + number + "-id"} id={"resource-" + number + "-id"}
                        onChange={e => addResource(e.target.value) } value={id} className={'resource-select'}>
                    <option name={"default-option-" + number} key={"default-option-" + number}
                            id={"default-option-" + number} value="----">----
                    </option>
                    {Object.values(resourceList).map(resource => {
                        return <option name={"resource-" + resource.id + "-option"}
                                       id={"resource-" + resource.id + "-option"}
                                       value={resource.id}
                                       key={"resource-" + resource.id + "-option"}>{resource.name} - {resource.external_id}</option>
                    })
                    }
                </select>
            </div>
            <div>
                <label htmlFor={"resource-" + number + "-amount"} className={'title-spec-resource title-count'}>Количество</label>
                <input type="number" name={"resource-" + number + "-amount"} id={"resource-" + number + "-amount"}
                       disabled={!activeAmount}
                       value={amount}
                       className={'resource-amount-input'}
                       onChange={e => setResourceAmount(id, e.target.value)}/>
            </div>
        </div>
    )
}

export default SpecificationResource