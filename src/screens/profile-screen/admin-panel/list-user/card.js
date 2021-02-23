const ProfileAdminCard = ({profile}) => {

    return (
        <div style="border:thin; display:inline;">
            {profile.username}
            <br/>
            profile.email}
            <br/>
            {profile.first_name} {profile.last_name}
            <br/>
            Роль: {profile.role}
        </div>
    )
}
export default ProfileAdminCard;