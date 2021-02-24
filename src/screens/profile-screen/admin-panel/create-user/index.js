import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {createProfileAction} from "../../../../actions/profile-create-actions";

const AddUser = () => {

    const dispatch = useDispatch()
    const [role, setRole] = useState("20");

    const submitHandler = e =>{
        e.preventDefault();
        dispatch(createProfileAction(role));
    }


    return (
        <div>
            <div>
                Создание нового пользователся.
            </div>
            <form onClick = {e=> e.stopPropagation()} onSubmit = {submitHandler}>
                <select onChange={e => setRole(e.target.value)} value={role}>
                    <option value="30" key={"30"}>Офисный работник</option>
                    <option value="20" key={"20"}>Работник склада</option>
                </select>
                <button type={"submit"}>Создать</button>
            </form>
        </div>
    )
}

export default AddUser;