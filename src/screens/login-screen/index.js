import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {loginUser}  from "../../actions/auth-actions";

import './login-screen.scss'

const LoginPage = ({ loginUser, history }) => {
    const [state, setState] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    };

    const login = async (event) => {
        event.preventDefault();
        const { username, password } = state;

        await loginUser(username, password);
        // history.push("/");
        window.location.href = "/"
    };

    console.log("Login pae render " + new Date())

    return (
        <div className={'login-screen-wrapper'}>
           <div className="info-login-wrapper">
               <div className={'login-title'}>Авторизация</div>
               <form onSubmit={login}>
                   <label>
                       <div className="label-text">Логин</div>
                       <input
                           name="username"
                           type="text"
                           value={state.username}
                           onChange={handleChange}
                       />
                   </label>
                   <label>
                       <div className="label-text">Пароль</div>
                       <input
                           name="password"
                           type="password"
                           value={state.password}
                           onChange={handleChange}
                       />
                   </label>
                   <button type="submit">Войти</button>
               </form>
           </div>
        </div>
    );
};

LoginPage.propTypes = {
    loginUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
    loginUser,
};

export default connect(null, mapDispatchToProps)(LoginPage);