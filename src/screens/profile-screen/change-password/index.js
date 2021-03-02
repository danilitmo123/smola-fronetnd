import {useDispatch} from "react-redux";
import {changePasswordAction} from "../../../actions/profile-change-password";
import React, {useState} from "react";

import './change-password.scss'
import axiosAPI from "../../../components/api/axiosApi";

const ChangePasswordBlock = () => {
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")

    const submitHandler = e => {
        e.preventDefault();
        if (password === passwordRepeat) {
            axiosAPI.post('authenticate/user/change-password/',
                {
                    'old_password': currentPassword,
                    'password': password
                }
            )
                .then(response => {
                    reloadData()
                    setErrorMessage("")
                })
                .catch(error => {
                    if (error.response.data.old_password) {
                        setErrorMessage("Неверный пароль")
                        setCurrentPassword('')
                    }
                })
        } else
            setErrorMessage("Пароли не совпадают");
    }

    const reloadData = () => {
        setCurrentPassword('')
        setPassword('')
        setPasswordRepeat('')
    }

    return (
        <div>
            <form onClick={e => e.stopPropagation()} onSubmit={submitHandler}>
                <div className={'change-password-wrapper'}>
                    <div className="change-password-title">Смена пароля</div>
                    {errorMessage ? (<div>{errorMessage}</div>) : null}
                    <label htmlFor="currentPassword" className={'password'}>Текущий пароль</label>
                    <input id={"currentPassword"} type="password" value={currentPassword}
                           onChange={e => setCurrentPassword(e.target.value)}/>
                    <br/>
                    <label htmlFor="password1" className={'password'}>Новый пароль</label>
                    <input id={"password1"} type="password" value={password}
                           onChange={e => setPassword(e.target.value)}/>
                    <label htmlFor="password2" className={'password'}>Повторите пароль</label>
                    <input id={"password2"} type="password" value={passwordRepeat}
                           onChange={e => setPasswordRepeat(e.target.value)}/>

                    <button type={'submit'}>Изменить</button>
                </div>

            </form>
        </div>
    )
}

export default ChangePasswordBlock;