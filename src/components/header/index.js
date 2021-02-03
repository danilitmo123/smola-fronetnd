import React from 'react'
import filter from '../../images/filter.svg'
import notifications from '../../images/notifications.svg'
import avatar from '../../images/avatar.svg'
import settings from '../../images/settings.svg'

import './header.scss'

const Header = () => {
    return (
        <div className="header-wrapper">
            <div className="filter-btn">
                <button><img src={filter} alt={'filter'}/>Фильтр</button>
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
        </div>
    )
}

export default Header