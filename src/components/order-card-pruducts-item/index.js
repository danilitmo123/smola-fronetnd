import React, {useEffect, useState} from "react";

import './order-card-products-item.scss'


const OrderCardProductsItem = ({data}) => {

    const [resourceDict, setResourceDict] = useState({})
    const [resources, setResources] = useState([])
    let missingResources = data.missing_resources


    let background = false

    data.order_specification.map(orderSpecification => {
        orderSpecification.specification.res_specs.map(resSpec => {
            let resource = resSpec.resource
            if (resourceDict.hasOwnProperty(resource.id)) {
                resourceDict[resource.id] = resourceDict[resource.id] + resSpec.amount
                // setResourceDict(resourceDict)
                return
            } else {
                resourceDict[resource.id] = resSpec.amount
                // setResourceDict(resourceDict)
            }
            background = !!missingResources.includes(resource.id);
            resources.push(
                <div className={background ? 'order-card-products-wrapper active' : 'order-card-products-wrapper'}>
                    <div className={'order-card-id'}>{resource.id}</div>
                    <div className={'order-card-name'}>{resource.name}</div>
                    <div className={'order-card-amount'}>{resourceDict[resource.id]}</div>
                </div>
            )
        })
    })

    return (
        <div>
            {resources.length ?
                <div>
                    <div className={"nav-card-products"}>
                        <div className={'ID'}>ID</div>
                        <div className={'nav-card-name'}>Название</div>
                        <div className={'nav-card-count'}>Количество</div>
                    </div>
                    {resources}
                </div> : ''
            }
        </div>
    )
}
export default OrderCardProductsItem