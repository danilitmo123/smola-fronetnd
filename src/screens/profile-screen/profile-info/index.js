import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {profileAction} from "../../../actions/profile-actions";
import AdminPanel from "../admin-panel";

const ProfileInfo = () => {
    const dispatch = useDispatch()
    const profileDetail = useSelector(state => state.profile)
    const {error, loading, profile} = profileDetail


    useEffect(() => {
        dispatch(profileAction())
    }, [dispatch])

    return (
        <div>
            <div>
                <div>
                    Username: {profile.username}
                </div>
                <div>
                    Email: {profile.email}
                </div>
                <div>
                    Имя: {profile.first_name}
                </div>
                <div>
                    Фамилия: {profile.last_name}
                </div>
                <div>
                    Роль: {profile.role}
                </div>
            </div>
            <AdminPanel/>
        </div>
    )
}
export default ProfileInfo;