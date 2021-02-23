import React, {useState} from 'react'
import filter from '../../images/filter.svg'
import notifications from '../../images/notifications.svg'
import avatar from '../../images/avatar.svg'
import settings from '../../images/settings.svg'

import './header.scss'
import CreateResourceModal from "../create-resource-modal";
import CreateSpecificationModal from "../create-specification-modal"
import UploadResources from "../upload-resource-modal"
import FilterModal from "../filter-modal";
import CreateOrderModal from "../create-order-modal";

const Header = ({active, orderBtn, resourcesBtn}) => {

    const [modalActive, setModalActive] = useState(false)
    const [resourceModalActive, setResourceModalActive] = useState(false)
    const [specificationModalActive, setSpecificationActive] = useState(false)
    const [uploadResourceModalActive, setUploadResourceModalActive] = useState(false)
    const [createOrderModal, setCreateModalActive] = useState(false)
    const [orderModalActive, setOrderModalActive] = useState(false)

    return (
        <div className="header-wrapper">
            <div className="filter-btn">
                <button onClick={() => setModalActive(true)}><img src={filter} alt={'filter'}/>Фильтр</button>
            </div>

            <div className="search-panel">
                <input type="text" placeholder={'Поиск по названию'}/>
            </div>
            {
                active ?
                    <div className="add-btn">
                        <button onClick={() => setSpecificationActive(true)}>Добавить спецификацию</button>
                    </div>
                    :  orderBtn ?
                    <div className="add-btn">
                      <button className={'do-order'} onClick={() => setCreateModalActive(true)}>Добавить заказ</button>
                    </div>
                    : resourcesBtn ?
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
            <div className="nav-bar">
                <img src={notifications} alt={'notifications'}/>
                <img src={settings} alt={'settings'}/>
                <img src={avatar} alt={'profile'}/>
            </div>
            <FilterModal active={modalActive} setActive={setModalActive}/>
            <UploadResources active={uploadResourceModalActive} setActive={setUploadResourceModalActive}/>
            <CreateResourceModal active={resourceModalActive} setActive={setResourceModalActive}/>
            <CreateSpecificationModal active={specificationModalActive} setActive={setSpecificationActive}/>
            <CreateOrderModal active={createOrderModal} setActive={setCreateModalActive}/>
        </div>
    )
}
export default Header;