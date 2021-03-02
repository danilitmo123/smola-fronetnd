import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {createProfileAction} from "../../../../actions/profile-create-actions";

import './create-user.scss'
import axiosAPI from "../../../../components/api/axiosApi";
import {profileAdminListAction} from "../../../../actions/profile-admin-list";

const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const AddUser = () => {

    const dispatch = useDispatch()
    const [role, setRole] = useState("20");
    const [email, setEmail] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const submitHandler = e => {
        e.preventDefault();
        if (reg.test(email) === false){
            setErrorMessage("Неверная почта")
            return
        }
        axiosAPI.post('authenticate/user/create/',
            {
                'role': role,
                'email': email
            }
        )
            .then(response => {
                reloadData()
                dispatch(profileAdminListAction())
                setErrorMessage("")
                }
            )
            .catch(error => {
                if (error.response && error.response.data){
                    if (error.response.data.email)
                    setErrorMessage(error.response.data.email)
                }
            })
    }

    const reloadData = () => {
        setRole("20")
        setEmail("")
    }


    return (
        <div>
            <div className={'create-user-title'}>
                Создание нового пользователя
            </div>
            <form onClick={e => e.stopPropagation()} onSubmit={submitHandler}>
                {errorMessage ? <div>{errorMessage}</div> : null}
                <select onChange={e => setRole(e.target.value)} value={role}>
                    <option value="30" key={"30"}>Офисный работник</option>
                    <option value="20" key={"20"}>Работник склада</option>
                </select>
                <label htmlFor="currentPassword" className={'password'}>email</label>
                <input id={"currentPassword"} type="email" value={email}
                       onChange={e => setEmail(e.target.value)}/>
                <button type={"submit"} className={'create-btn'}>Создать</button>
            </form>
        </div>
    )
}

export default AddUser;