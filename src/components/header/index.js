import React, {useEffect, useState} from 'react'
import filter from '../../images/filter.svg'
import './header.scss'
import CreateResourceModal from "../create-resource-modal";
import CreateSpecificationModal from "../create-specification-modal"
import UploadResources from "../upload-resource-modal"

import {useDispatch, useSelector} from "react-redux";
import FilterModal from "../filter-modal";
import CreateOrderModal from "../create-order-modal";
import {logoutUser} from "../../actions/auth-actions"
import {SPECIFICATION_SEARCH, ORDER_SEARCH, RESOURCE_SEARCH} from "../../constants/search-constatants"
import {listSpecifications} from "../../actions/specification-actions";
import {listProducts} from "../../actions/product-actions";
import {listOrders} from "../../actions/order-list-actions";

const Header = () => {

    const switcher = useSelector(state => state.switchPage)
    const {specificationPage, resourcePage, orderPage, mainPage, profilePage} = switcher
    const dispatch = useDispatch()
    const [filterModalActive, setFilterModalActive] = useState(false)
    const [resourceModalActive, setResourceModalActive] = useState(false)
    const [specificationModalActive, setSpecificationActive] = useState(false)
    const [uploadResourceModalActive, setUploadResourceModalActive] = useState(false)
    const [orderModalActive, setOrderModalActive] = useState(false)

    const [searchString, setSearchString] = useState("")
    const {searchOrder, searchResource, searchSpecification} = useSelector(state => state.searching)


    useEffect(() =>{
        if (specificationPage) {
            setSearchString(searchSpecification ? searchSpecification : "")
        } else if (resourcePage) {
            setSearchString(searchResource ? searchResource : "")
        } else if (orderPage) {
            setSearchString(searchOrder ? searchOrder : "")
        }
    })

    const changeSearchString = (string) => {
        setSearchString(string)
        if (specificationPage) {
            dispatch({type: SPECIFICATION_SEARCH, payload: string})
            dispatch(listSpecifications())
        } else if (resourcePage) {
            dispatch({type: RESOURCE_SEARCH, payload: string})
            dispatch(listProducts())
        } else if (orderPage) {
            dispatch({type: ORDER_SEARCH, payload: string})
            dispatch(listOrders())
        }
    }

    const handleLogout = async () => {
        await logoutUser();
        window.location.href = "/login/"
    };

    return (
        <div className="header-wrapper">
            {mainPage || profilePage ? ''
                : <div className={'filter-wrapper'}>
                    <div className="filter-btn">
                        <button onClick={() => setFilterModalActive(true)}><img src={filter} alt={'filter'}/>Фильтр
                        </button>
                    </div>

                    <div className="search-panel">
                        <input type="text" placeholder={'Поиск по названию'} value={searchString}
                               onChange={e => changeSearchString(e.target.value)}/>
                    </div>
                </div>
            }
            <div className={'buttons-wrapper'}>
                <div className="first-group">
                    {
                        specificationPage ?
                            <div className="add-btn">
                                <button onClick={() => setSpecificationActive(true)}>Добавить спецификацию</button>
                            </div>
                            : orderPage ?
                            <div className="add-btn">

                            </div>
                            : resourcePage ?
                                <div className={'group-btn'}>
                                    <div className="add-btn">
                                        <button onClick={() => setUploadResourceModalActive(true)}>Загрузить ресурсы
                                        </button>
                                    </div>
                                    <div className="add-btn">
                                        <button onClick={() => setResourceModalActive(true)}>Добавить ресурс</button>
                                    </div>
                                </div>
                                : null
                    }
                </div>
                <button onClick={handleLogout} className={'logout-btn'}>Выйти</button>
            </div>

            <FilterModal active={filterModalActive} setActive={setFilterModalActive}/>
            <CreateOrderModal active={orderModalActive} setActive={setOrderModalActive}/>
            <UploadResources active={uploadResourceModalActive} setActive={setUploadResourceModalActive}/>
            <CreateResourceModal active={resourceModalActive} setActive={setResourceModalActive}/>
            <CreateSpecificationModal active={specificationModalActive} setActive={setSpecificationActive}/>

        </div>
    )
}
export default Header;