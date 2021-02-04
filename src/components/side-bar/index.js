import React from 'react'
import {Link} from "react-router-dom";
import logo from '../../images/avatar.svg'
import dashboard from '../../images/dashboard.svg'
import deals from '../../images/deals.svg'
import vector from '../../images/Vector.svg'

import './side-bar.scss'

const SideBar = () => {
    return (
        <div className="side-bar">
            <div className="side-bar-logo">Smola20.ru</div>
            <div className="profile-logo">
                <img src={logo} alt={'profile-logo'}/>
                <div className="user">Филлип Пузырев<br/>smola20@info.ru</div>
            </div>
            <div className="side-nav-bar">
                <Link to={'/'}>
                    <div className="dashboard items">
                        <img src={dashboard} alt={'dashboard'}/>
                        <div className="dashboard-text">Спецификации</div>
                    </div>
                </Link>
                <Link to={'/purchases'}>
                    <div className="deals items">
                        <img src={vector} alt={'deals'}/>
                        <div className="dashboard-text">Закупки</div>
                    </div>
                </Link>
                <Link to={'/resources'}>
                    <div className="vector items">
                        <img src={deals} alt={'vector'}/>
                        <div className="dashboard-text">Ресурсы</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default SideBar