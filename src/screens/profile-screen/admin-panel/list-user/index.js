import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {profileAdminListAction} from "../../../../actions/profile-admin-list";
import ProfileAdminCard from "./card";

const ProfileAdminList = () => {
    const dispatch = useDispatch()
    const profileList = useSelector(state => state.profileAdminList)
    const {error, loading, profileAdminList} = profileList


    useEffect(() => {
        dispatch(profileAdminListAction())
    }, [dispatch])

    console.log("profiles")
    console.log({profileAdminList})
    return (
        <div>{
            profileAdminList !== undefined ?
                <div>
                    {
                        Object.values(profileAdminList).map(profile => {
                            console.log("profiles: " + profileAdminList);
                            return <ProfileAdminCard profile={profile}/>
                    })}
                </div>
                : null}

        </div>
    )
}
export default ProfileAdminList;