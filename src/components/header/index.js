import React, {useState} from 'react'
import filter from '../../images/filter.svg'
import notifications from '../../images/notifications.svg'
import avatar from '../../images/avatar.svg'
import settings from '../../images/settings.svg'

import './header.scss'
import FilterModal from "../filter-modal";

const Header = () => {

    const [modalActive, setModalActive] = useState(false)

    return (
        <div className="header-wrapper">
            <div className="filter-btn">
                <button onClick={() => setModalActive(true)}><img src={filter} alt={'filter'}/>Фильтр</button>
            </div>
            <div className="search-panel">
                <input type="text" placeholder={'Поиск по названию'}/>
            </div>
            <div className="add-btn">
                <button>Добавить ресурс</button>
            </div>
            <div className="nav-bar">
                <img src={notifications} alt={'notifications'}/>
                <img src={settings} alt={'settings'}/>
                <img src={avatar} alt={'profile'}/>
            </div>
            <FilterModal active={modalActive} setActive={setModalActive}/>
        </div>
    )
}

export default Header