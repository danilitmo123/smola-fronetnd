import ProfileInfo from "./profile-info";
import ChangePasswordBlock from "./change-password";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {switchProfileAction} from "../../actions/switch-page-actions";

const ProfileScreen = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(switchProfileAction())
    })
    return (
        <div>
            <ProfileInfo/>
            <hr/>
            <ChangePasswordBlock/>
        </div>
    )

}
export default ProfileScreen;