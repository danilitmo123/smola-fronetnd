import React, {useEffect, useState} from 'react'
import {Link, useHistory} from "react-router-dom";
import logo from '../../images/avatar.svg'
import firstItem from '../../images/first-side-bar-item.svg'
import firstItemActive from '../../images/first-side-bar-active.svg'
import secondItem from '../../images/second-side-bar-item.svg'
import secondItemActive from '../../images/second-side-active.svg'
import thirdItem from '../../images/third-sibe-bar-item.svg'
import thirdItemActive from '../../images/third-side-bar-active.svg'
import './side-bar.scss'
import {connect, useDispatch} from "react-redux";
import * as PropTypes from "prop-types";
import {logoutUser} from "../../actions/auth-actions";

const SideBar = ({accessToken, setActive, setOrderBtn, setResourcesActive, logoutUser}) => {

    const history = useHistory();

    const handleLogout = async () => {
        await logoutUser();
        history.push("login/");
    };

    const dispatch = useDispatch()

    const [specificationNavActive, setSpecificationNavActive] = useState(true)
    const [purchasesNavActive, setPurchasesNavActive] = useState(false)
    const [resourcesNavActive, setResourcesNavActive] = useState(false)

    const specChangeColor = () => {
        setSpecificationNavActive(true)
        setPurchasesNavActive(false)
        setResourcesNavActive(false)
        setActive(true)
    }

    const purchasesChangeColor = () => {
        setSpecificationNavActive(false)
        setPurchasesNavActive(true)
        setResourcesNavActive(false)
        setActive(false)
        setOrderBtn(true)
    }

    const resourcesChangeColor = () => {
        setSpecificationNavActive(false)
        setPurchasesNavActive(false)
        setResourcesNavActive(true)
        setActive(false)
        setOrderBtn(false)
        setResourcesActive(true)
    }
    return (<div className="side-bar">
            <div className="side-bar-logo">Smola20.ru</div>
            <div className="profile-logo">
                <img src={logo} alt={'profile-logo'}/>
                <div className="user">Филлип Пузырев<br/>smola20@info.ru</div>
            </div>
            <div className="side-nav-bar">
                <Link to={'/'} className={'link'}>
                    <div className="dashboard items" onClick={specChangeColor}>
                        {
                            specificationNavActive ? <img src={firstItemActive} alt="dashboardActive"/> :
                                <img src={firstItem} alt="dashboard"/>
                        }
                        <div
                            className={specificationNavActive ? 'dashboard-text active' : 'dashboard-text'}>Спецификации
                        </div>
                    </div>
                </Link>
                <Link to={'/orders'} className={'link'}>
                    <div className="deals items" onClick={purchasesChangeColor}>
                        {
                            purchasesNavActive ? <img src={secondItemActive} alt="dashboardActive"/> :
                                <img src={secondItem} alt="dashboard"/>
                        }
                        <div className={purchasesNavActive ? 'dashboard-text active' : 'dashboard-text'}>Заказы</div>
                    </div>
                </Link>
                <Link to={'/resources'} className={'link'}>
                    <div className="vector items" onClick={resourcesChangeColor}>
                        {
                            resourcesNavActive ? <img src={thirdItemActive} alt="dashboardActive"/> :
                                <img src={thirdItem} alt="dashboard"/>
                        }
                        <div className={resourcesNavActive ? 'dashboard-text active' : 'dashboard-text'}>Ресурсы</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

SideBar.propTypes = {
    accessToken: PropTypes.string,
    logoutUser: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        accessToken: state.auth,
    };
}

const mapDispatchToProps = {
    logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);