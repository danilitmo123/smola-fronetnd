import React, {useEffect, useState} from 'react'
import {Link, useHistory} from "react-router-dom";
import logo from '../../images/avatar.svg'
import firstItem from '../../images/first-side-bar-item.svg'
import firstItemActive from '../../images/first-side-bar-active.svg'
import secondItem from '../../images/second-side-bar-item.svg'
import secondItemActive from '../../images/second-side-active.svg'
import thirdItem from '../../images/third-sibe-bar-item.svg'
import thirdItemActive from '../../images/third-side-bar-active.svg'
import mainPageIcon from '../../images/inbox-alt.svg'
import './side-bar.scss'
import {connect, useDispatch, useSelector} from "react-redux";
import * as PropTypes from "prop-types";
import * as action from "../../actions/switch-page-actions"
import {logoutUser} from "../../actions/auth-actions";

const SideBar = () => {

    const switcher = useSelector(state => state.switchPage)
    const {specificationPage, resourcePage, orderPage, mainPage} = switcher

    console.log("Side bar render " + new Date())

    const history = useHistory();

    const handleLogout = async () => {
        await logoutUser();
        history.push("login/");
    };

    const dispatch = useDispatch()

    console.log(specificationPage)
    console.log(resourcePage)
    console.log(orderPage)
    console.log(mainPage)

    return (
        <div className="side-bar">
            <div className="side-bar-logo">Smola20.ru</div>
            <div className="profile-logo">
                <img src={logo} alt={'profile-logo'}/>
                <div className="user">Филлип Пузырев<br/>smola20@info.ru</div>
            </div>
            <div className="side-nav-bar">
                <Link to={'/'} className={'link'}>
                    <div className={'dashboard items'} onClick={e => dispatch(action.switchMainPageAction())}>
                        <img src={mainPageIcon} alt=""/>
                        <div className={mainPage ? 'dashboard-text active' : 'dashboard-text'}>Главная</div>
                    </div>
                </Link>
                <Link to={'/specification'} className={'link'}>
                    <div className="dashboard items" onClick={e => dispatch(action.switchSpecificationPageAction())}>
                        {
                            specificationPage ? <img src={firstItemActive} alt="dashboardActive"/> :
                                <img src={firstItem} alt="dashboard"/>
                        }
                        <div
                            className={specificationPage ? 'dashboard-text active' : 'dashboard-text'}>Спецификации
                        </div>
                    </div>
                </Link>
                <Link to={'/orders'} className={'link'}>
                    <div className="deals items" onClick={e => dispatch(action.switchOrderPageAction())}>
                        {
                            orderPage ? <img src={secondItemActive} alt="dashboardActive"/> :
                                <img src={secondItem} alt="dashboard"/>
                        }
                        <div className={orderPage ? 'dashboard-text active' : 'dashboard-text'}>Заказы</div>
                    </div>
                </Link>
                <Link to={'/resources'} className={'link'}>
                    <div className="vector items" onClick={e => dispatch(action.switchResourcePageAction())}>
                        {
                            resourcePage ? <img src={thirdItemActive} alt="dashboardActive"/> :
                                <img src={thirdItem} alt="dashboard"/>
                        }
                        <div className={resourcePage ? 'dashboard-text active' : 'dashboard-text'}>Ресурсы</div>

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