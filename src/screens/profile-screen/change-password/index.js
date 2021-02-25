import {useDispatch} from "react-redux";
import {changePasswordAction} from "../../../actions/profile-change-password";
import React, {useState} from "react";

import './change-password.scss'

const ChangePasswordBlock = () => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const submitHandler = e => {
        e.preventDefault();
        if (password === passwordRepeat) {
            dispatch(changePasswordAction(password));
            reloadData()
        }
        else
            setErrorMessage("Пароли не совпадают");
    }

    const reloadData = () =>{
        setPassword('')
        setPasswordRepeat('')
    }

    return (
        <div>
            <form onClick={e => e.stopPropagation()} onSubmit={submitHandler}>
                <div className={'change-password-wrapper'}>
                    <div className="change-password-title">Смена пароля</div>
                    <label htmlFor="password1" className={'password'}>Пароль</label>
                    <input id={"password1"} type="password" value={password}
                           onChange={e => setPassword(e.target.value)}/>
                    <label htmlFor="password2" className={'password'}>Повторите пароль</label>
                    <input id={"password2"} type="password" value={passwordRepeat}
                           onChange={e => setPasswordRepeat(e.target.value)} />
                    {errorMessage ? (<div>{errorMessage}</div>) : null}
                    <button type={'submit'}>Изменить</button>
                </div>

            </form>
        </div>
    )
}

export default ChangePasswordBlock;