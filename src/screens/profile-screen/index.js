import ProfileInfo from "./profile-info";
import ChangePasswordBlock from "./change-password";

const ProfileScreen = () => {
    console.log("Profile screen render")
    console.log("Profile pathname: " + window.location.pathname)
    return (
        <div>
            <ProfileInfo/>
            <hr/>
            <ChangePasswordBlock/>
        </div>
    )

}
export default ProfileScreen;