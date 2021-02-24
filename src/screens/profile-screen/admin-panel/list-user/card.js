import "./list-user.scss"
const ProfileAdminCard = ({profile}) => {

    return (
        <div className={"profile-card"}>
            {profile.username}
            <br/>
            {profile.email}
            <br/>
            {profile.first_name} {profile.last_name}
            <br/>
            Роль: {profile.role}
        </div>
    )
}
export default ProfileAdminCard;