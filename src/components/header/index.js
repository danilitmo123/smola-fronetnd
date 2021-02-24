import React, {useState} from 'react'
import filter from '../../images/filter.svg'
import notifications from '../../images/notifications.svg'
import avatar from '../../images/avatar.svg'
import settings from '../../images/settings.svg'

import './header.scss'
import CreateResourceModal from "../create-resource-modal";
import CreateSpecificationModal from "../create-specification-modal"
import UploadResources from "../upload-resource-modal"

import {useDispatch, useSelector} from "react-redux";
import FilterModal from "../filter-modal";
import CreateOrderModal from "../create-order-modal";
import {logoutUser} from "../../actions/auth-actions"

const Header = () => {

    const [filterModalActive, setFilterModalActive] = useState(false)
    const [resourceModalActive, setResourceModalActive] = useState(false)
    const [specificationModalActive, setSpecificationActive] = useState(false)
    const [uploadResourceModalActive, setUploadResourceModalActive] = useState(false)
    const [createOrderModal, setCreateModalActive] = useState(false)
    const [orderModalActive, setOrderModalActive] = useState(false)
    const dispatch = useDispatch();
    const switcher = useSelector(state => state.switchPage)
    const {specificationPage, resourcePage, orderPage, mainPage} = switcher
    console.log("Header render " + new Date())
    console.log("Header href " + window.location.pathname)
    const handleLogout = async () => {
        await logoutUser();
        window.location.href = "/login/"
    };

    return (
        <div className="header-wrapper">
            <div className="filter-btn">
                <button onClick={() => setFilterModalActive(true)}><img src={filter} alt={'filter'}/>Фильтр</button>
            </div>

            <div className="search-panel">
                <input type="text" placeholder={'Поиск по названию'}/>
            </div>
            {
                specificationPage ?
                    <div className="add-btn">
                        <button onClick={() => setSpecificationActive(true)}>Добавить спецификацию</button>
                    </div>
                    : orderPage ?
                    <div className="add-btn">
                        <button onClick={() => setOrderModalActive(true)}>Добавить спецификацию</button>
                    </div>
                    : resourcePage ?
                        <div className={'group-btn'}>
                            <div className="add-btn">
                                <button onClick={() => setUploadResourceModalActive(true)}>Загрузить ресурсы</button>
                            </div>
                            <div className="add-btn">
                                <button onClick={() => setResourceModalActive(true)}>Добавить ресурс</button>
                            </div>
                        </div>
                        : null
            }
            <button onClick={handleLogout}>Выйти</button>

            <div className="nav-bar">
                <img src={notifications} alt={'notifications'}/>
                <img src={settings} alt={'settings'}/>
                <img src={avatar} alt={'profile'}/>
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