import React, {useEffect, useState} from 'react'

import './filter-modal.scss'
import {useDispatch, useSelector} from "react-redux";
import {RESOURCE_FILTER, SPECIFICATION_FILTER, ORDER_FILTER} from "../../constants/filter-constants"
import {listSpecifications} from "../../actions/specification-actions";
import {listProducts} from "../../actions/product-actions";
import {listOrders} from "../../actions/order-list-actions";

const FilterModal = ({active, setActive}) => {
    const {specificationPage, resourcePage, orderPage} = useSelector(state => state.switchPage)
    const {filterOrder, filterResource, filterSpecification} = useSelector(state => state.filtering)

    useEffect(() => {
        if (!!specificationPage) {
            let filterSpecificationObject = filterSpecification ? filterSpecification : {}
            if (filterSpecificationObject.hasOwnProperty('ordering')) {
                let ord = filterSpecificationObject.ordering
                setDesc(ord.startsWith('-'))
                setOrderingName(ord.replace('-', ''))
                setOrdering(ord)
            }

        } else if (!!resourcePage) {
            let filterResourceObject = filterResource ? filterResource : {}
            if (filterResourceObject.hasOwnProperty('ordering')) {
                let ord = filterResourceObject.ordering
                setDesc(ord.startsWith('-'))
                setOrderingName(ord.replace('-', ''))
                setOrdering(ord)
            }
        } else if (!!orderPage) {
            let filterOrderObject = filterOrder ? filterOrder : {}
            if (filterOrderObject.hasOwnProperty('ordering')) {
                let ord = filterOrderObject.ordering
                setDesc(ord.startsWith('-'))
                setOrderingName(ord.replace('-', ''))
                setOrdering(ord)
            }
        }
    }, [specificationPage, resourcePage, orderPage])

    const [ordering, setOrdering] = useState('')
    const [orderingName, setOrderingName] = useState('')
    const [filter, setFilter] = useState({})
    const [desc, setDesc] = useState(false)
    const [verifyFilter, setVerifyFilter] = useState('')
    const dispatch = useDispatch()


    const updateOrdering = (d, oN) => {
        let ord = (d ? '-' : '') + oN
        setOrdering(ord)
    }

    const setDescending = () => {
        setDesc(!desc)
        updateOrdering(!desc, orderingName)
    }
    const onChangeOrdering = (value) => {
        setOrderingName(value)
        updateOrdering(desc, value)
    }

    const onVerifyFilterSet = () => {
        setVerifyFilter(!verifyFilter)
        if (verifyFilter) {
            filter.verified = undefined
            setFilter(filter)
        } else {
            filter.verified = 'false'
        }
    }
    const filterOptionHandler = (filterName, filterValue) => {
        filter[filterName] = filterValue
        setFilter({...filter})
        console.log(filter)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let payload = {}
        if (ordering && ordering !== 'null' && ordering !== '-null') {
            payload['ordering'] = ordering
        }
        for (let prop in filter) {
            if (!(typeof filter[prop] === "undefined")) {
                payload[prop] = filter[prop]
            }
        }
        console.log({payload})
        if (specificationPage) {
            dispatch({
                type: SPECIFICATION_FILTER,
                payload: payload
            })
            dispatch(listSpecifications())
        }
        if (resourcePage) {
            dispatch({
                type: RESOURCE_FILTER,
                payload: payload
            })
            dispatch(listProducts())
        }
        if (orderPage) {
            dispatch({
                type: ORDER_FILTER,
                payload: payload
            })
            dispatch(listOrders())
        }
        setActive(false)
    }

    return (
        <div
            onClick={() => setActive(false)}
            className={active ? 'filter-modal active' : 'filter-modal'}>
            <form onClick={e => e.stopPropagation()} className={active ? 'modal-content active' : 'modal-content'}>
                <div className="filter-wrapper">
                    <div className="filter-title">СОРТИРОВАТЬ ПО:</div>
                    <div className="checkbox-wrapper">
                        <div className="id-checkbox">
                            <div className="title">Не сортировать</div>
                            <input type="radio" name={'ordering'} value={'null'} checked={orderingName === 'null'}
                                   onChange={e => {
                                       onChangeOrdering(e.target.value)
                                   }}/>
                        </div>
                        {resourcePage ? <div className="id-checkbox">
                            <div className="title">ID</div>
                            <input type="radio" name={'ordering'} value={'external_id'}
                                   checked={orderingName === 'external_id'} onChange={e => {
                                onChangeOrdering(e.target.value)
                            }}/>
                        </div> : null}
                        {specificationPage ? <div className="id-checkbox">
                            <div className="title">ID</div>
                            <input type="radio" name={'ordering'} value={'product_id'}
                                   checked={orderingName === 'product_id'} onChange={e => {
                                onChangeOrdering(e.target.value)
                            }}/>
                        </div> : null}
                        {specificationPage ? <div className="id-checkbox">
                            <div className="title">Себестоимость</div>
                            <input type="radio" name={'ordering'} value={'prime_cost'}
                                   checked={orderingName === 'prime_cost'} onChange={e => {
                                onChangeOrdering(e.target.value)
                            }}/>
                        </div> : null}
                        {specificationPage ? <div className="id-checkbox">
                            <div className="title">Цена</div>
                            <input type="radio" name={'ordering'} value={'price'} checked={orderingName === 'price'}
                                   onChange={e => {
                                       onChangeOrdering(e.target.value)
                                   }}/>
                        </div> : null}
                        {resourcePage ? <div className="id-checkbox">
                            <div className="title">Цена</div>
                            <input type="radio" name={'ordering'} value={'cost'} checked={orderingName === 'cost'}
                                   onChange={e => {
                                       onChangeOrdering(e.target.value)
                                   }}/>
                        </div> : null}

                        {specificationPage || resourcePage ?
                            <div className="id-checkbox">
                                <div className="title">Количество</div>
                                <input type="radio" name={'ordering'} value={'amount'}
                                       checked={orderingName === 'amount'} onChange={e => {
                                    onChangeOrdering(e.target.value)
                                }}/>
                            </div> : null}
                        {orderPage ? <div className="id-checkbox">
                            <div className="title">ID заказа</div>
                            <input type="radio" name={'ordering'} value={'external_id'}
                                   checked={orderingName === 'external_id'} onChange={e => {
                                onChangeOrdering(e.target.value)
                            }}/>
                        </div> : null}
                        {orderPage ? <div className="id-checkbox">
                            <div className="title">Статус</div>
                            <input type="radio" name={'ordering'} value={'status'} checked={orderingName === 'status'}
                                   onChange={e => {
                                       onChangeOrdering(e.target.value)
                                   }}/>
                        </div> : null}
                        {orderPage ? <div className="id-checkbox">
                            <div className="title">Дата заказа</div>
                            <input type="radio" name={'ordering'} value={'created_at'}
                                   checked={orderingName === 'created_at'} onChange={e => {
                                onChangeOrdering(e.target.value)
                            }}/>
                        </div> : null}
                        {orderPage ? <div className="id-checkbox">
                            <div className="title">Источник заказа</div>
                            <input type="radio" name={'ordering'} value={'source__name'}
                                   checked={orderingName === 'source__name'} onChange={e => {
                                onChangeOrdering(e.target.value)
                            }}/>
                        </div> : null}
                        {specificationPage || resourcePage ?
                            <div className="id-checkbox">
                                <div className="title">Название</div>
                                <input type="radio" name={'ordering'} value={'name'} checked={orderingName === 'name'}
                                       onChange={e => {
                                           onChangeOrdering(e.target.value)
                                       }}/>
                            </div> : null}
                        {specificationPage ? <div className="id-checkbox">
                            <div className="title">Коеффицент</div>
                            <input type="radio" name={'ordering'} value={'coefficient'}
                                   checked={orderingName === 'coefficient'} onChange={e => {
                                onChangeOrdering(e.target.value)
                            }}/>
                        </div> : null}
                        {specificationPage ? <div className="id-checkbox">
                            <div className="title">Категория</div>
                            <input type="radio" name={'ordering'} value={'category__name'}
                                   checked={orderingName === 'category__name'} onChange={e => {
                                onChangeOrdering(e.target.value)
                            }}/>
                        </div> : null}
                        {resourcePage ? <div className="id-checkbox">
                            <div className="title">Поставщик</div>
                            <input type="radio" name={'ordering'} value={'provider__name'}
                                   checked={orderingName === 'provider__name'} onChange={e => {
                                onChangeOrdering(e.target.value)
                            }}/>
                        </div> : null}
                        {specificationPage ? <div className="id-checkbox">
                            <div className="title">Послдениее измениние цены</div>
                            <input type="radio" name={'ordering'} value={'last_change_cost'}
                                   checked={orderingName === 'last_change_cost'} onChange={e => {
                                onChangeOrdering(e.target.value)
                            }}/>
                        </div> : null}


                    </div>
                    <div className="id-checkbox">
                        <div className="title">По убыванию</div>
                        <input type="checkbox" name={'orderingDESC'} onClick={setDescending}
                               checked={desc}/>
                    </div>

                    <div>
                        {specificationPage || orderPage ? <div>Фильтрация</div> : null }
                        {specificationPage ? <div className="id-checkbox">
                            <div className="title">С неподтверждёнными ценами</div>
                            <input type="checkbox" name={'verified'}
                                   checked={verifyFilter} onClick={onVerifyFilterSet}/>
                        </div> : null}
                        {orderPage ? <div className="id-checkbox">
                            <div className="title">Активные</div>
                            <input type="radio" name={'orderStatus'} value={'ACT'}
                                   checked={filter.status === 'ACT'}
                                   onChange={e => filterOptionHandler('status', e.target.value)}/>
                        </div> : null}
                        {orderPage ? <div className="id-checkbox">
                            <div className="title">Готовые</div>
                            <input type="radio" name={'orderStatus'} value={'RDY'}
                                   checked={filter.status === 'RDY'}
                                   onChange={e => filterOptionHandler('status', e.target.value)}/>
                        </div> : null}
                        {orderPage ? <div className="id-checkbox">
                            <div className="title">Неактивные</div>
                            <input type="radio" name={'orderStatus'} value={'INC'}
                                   checked={filter.status === 'INC'}
                                   onChange={e => filterOptionHandler('status', e.target.value)}/>
                        </div> : null}
                        {orderPage ? <div className="id-checkbox">
                            <div className="title">Отгруженные</div>
                            <input type="radio" name={'orderStatus'} value={'CNF'}
                                   checked={filter.status === 'CNF'}
                                   onChange={e => filterOptionHandler('status', e.target.value)}/>
                        </div> : null}
                        {orderPage ? <div className="id-checkbox">
                            <div className="title">Любой</div>
                            <input type="radio" name={'orderStatus'} value={undefined}
                                   checked={!filter.status}
                                   onChange={e => filterOptionHandler('status', e.target.value)}/>
                        </div> : null}
                    </div>
                </div>
                <button className={'filter-btn'} onClick={onSubmit}>Применить
                </button>
            </form>
        </div>
    )
}

export default FilterModal