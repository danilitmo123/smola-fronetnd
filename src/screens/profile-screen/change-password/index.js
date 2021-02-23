import {useDispatch} from "react-redux";
import {changePasswordAction} from "../../../actions/profile-change-password";
import React, {useState} from "react";

const ChangePasswordBlock = () => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const submitHandler = e => {
        e.preventDefault();
        if (password === passwordRepeat)
            dispatch(changePasswordAction());
        else
            setErrorMessage("Пароли не совпадают");
    }

    return (
        <div>
            <form onClick={e => e.stopPropagation()} onSubmit={submitHandler}>
                <label htmlFor="password1">Пароль</label>
                <input id={"password1"} type="password" value={password}
                       onChange={e => setPassword(e.target.value)}/>
                <label htmlFor="password2">повторите пароль</label>
                <input id={"password2"} type="password" value={password}
                       onChange={e => setPasswordRepeat(e.target.value)}/>
                {errorMessage ? (<div>{errorMessage}</div>) : null}
                <button type={'submit'}>Поменять</button>
            </form>
        </div>
    )
}

export default ChangePasswordBlock;