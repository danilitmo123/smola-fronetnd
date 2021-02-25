import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {profileAction} from "../../../actions/profile-actions";
import AdminPanel from "../admin-panel";
import {editProfileAction} from "../../../actions/profile-edit";

import './profile-info.scss'

const ProfileInfo = () => {
    const dispatch = useDispatch()
    const profileDetail = useSelector(state => state.profile)
    const {error, loading, profile} = profileDetail
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [lastName, setLastName] = useState()
    const [firstName, setFirstName] = useState()


    useEffect(() => {
        dispatch(profileAction())
    }, [dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        if (!Boolean(username))
            setUsername(profile.username)
        if (!Boolean(lastName))
            setLastName(profile.last_name)
        if (!Boolean(firstName) )
            setFirstName(profile.first_name)
        if (!Boolean(email))
            setEmail(profile.email)
        console.log({username})
        console.log({lastName})
        console.log({firstName})
        console.log({email})
        dispatch(editProfileAction(username, email, lastName, firstName));
    }

    return (
        <div className={'profile-info-wrapper'}>
            <div>
                <form onSubmit={submitHandler}>
                    <div className={'profile-info-text'}>
                        Логин: <input type="text" value={username ? username : profile.username}
                                         onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className={'profile-info-text'}>
                        Email: <input type="text" value={email ? email : profile.email}
                                      onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className={'profile-info-text'}>
                        Имя: <input type="text" value={firstName ? firstName : profile.first_name}
                                    onChange={e => setFirstName(e.target.value)}/>
                    </div>
                    <div className={'profile-info-text'}>
                        Фамилия: <input type="text" value={lastName ? lastName : profile.last_name}
                                        onChange={e => setLastName(e.target.value)}/>
                    </div>
                    <div className={'profile-info-text'}>
                        Роль: {profile.role === 40 ? <div>Админ</div>
                        : profile.role === 30 ? <div>Работник офиса</div>
                        : profile.role === 20 ? <div>Работник склада</div> : null}
                    </div>
                    <button type={'submit'}>Подтведить</button>
                </form>
                <hr/>
                {
                    profile.role === 40 ? <AdminPanel/> : null
                }
            </div>
        </div>
    )
}
export default ProfileInfo;