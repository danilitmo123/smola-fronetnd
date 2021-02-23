import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {profileAdminListAction} from "../../../../actions/profile-admin-list";
import ProfileAdminCard from "./card";

const ProfileAdminList = () => {
    const dispatch = useDispatch()
    const profileList = useSelector(state => state.profileAdminList)
    const {error, loading, profiles} = profileList


    useEffect(() => {
        dispatch(profileAdminListAction())
    }, [dispatch])

    return (
        <div>
            {Object.values(profiles).map(profile => {
                return <ProfileAdminCard profile={profile}/>
            })}
        </div>
    )
}
export default ProfileAdminList;