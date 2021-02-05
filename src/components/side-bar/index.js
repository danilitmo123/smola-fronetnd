import React, { useState} from 'react'
import {Link} from "react-router-dom";
import logo from '../../images/avatar.svg'
import firstItem from '../../images/first-side-bar-item.svg'
import firstItemActive from '../../images/first-side-bar-active.svg'
import secondItem from '../../images/second-side-bar-item.svg'
import secondItemActive from '../../images/second-side-active.svg'
import thirdItem from '../../images/third-sibe-bar-item.svg'
import thirdItemActive from '../../images/third-side-bar-active.svg'
import './side-bar.scss'

const SideBar = () => {

    const [specificationNavActive, setSpecificationNavActive] = useState(true)
    const [purchasesNavActive,setPurchasesNavActive] = useState(false)
    const [resourcesNavActive,setResourcesNavActive] = useState(false)

    const specChangeColor = () => {
        setSpecificationNavActive(true)
        setPurchasesNavActive(false)
        setResourcesNavActive(false)
    }

    const purchasesChangeColor = () => {
        setSpecificationNavActive(false)
        setPurchasesNavActive(true)
        setResourcesNavActive(false)
    }

    const resourcesChangeColor = () => {
        setSpecificationNavActive(false)
        setPurchasesNavActive(false)
        setResourcesNavActive(true)
    }



    return (
        <div className="side-bar">
            <div className="side-bar-logo">Smola20.ru</div>
            <div className="profile-logo">
                <img src={logo} alt={'profile-logo'}/>
                <div className="user">Филлип Пузырев<br/>smola20@info.ru</div>
            </div>
            <div className="side-nav-bar">
                <Link to={'/'} className={'link'}>
                    <div className="dashboard items" onClick={specChangeColor}>
                        {
                            specificationNavActive ? <img src={firstItemActive} alt="dashboardActive" /> :
                                <img src={firstItem} alt="dashboard"/>
                        }
                        <div className={specificationNavActive ? 'dashboard-text active' : 'dashboard-text'}>Спецификации</div>
                    </div>
                </Link>
                <Link to={'/purchases'} className={'link'}>
                    <div className="deals items" onClick={purchasesChangeColor}>
                        {
                            purchasesNavActive ? <img src={secondItemActive} alt="dashboardActive" /> :
                                <img src={secondItem} alt="dashboard"/>
                        }
                        <div className={purchasesNavActive ? 'dashboard-text active' : 'dashboard-text'}>Закупки</div>
                    </div>
                </Link>
                <Link to={'/resources'} className={'link'}>
                    <div className="vector items" onClick={resourcesChangeColor}>
                        {
                            resourcesNavActive ? <img src={thirdItemActive} alt="dashboardActive" /> :
                                <img src={thirdItem} alt="dashboard"/>
                        }
                        <div className={resourcesNavActive ? 'dashboard-text active' : 'dashboard-text'}>Ресурсы</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default SideBar