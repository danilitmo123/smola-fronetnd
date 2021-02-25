import React from "react";
import "./list-user.scss"
const ProfileAdminCard = ({profile}) => {

    return (
        <div className={"profile-card"}>
            <div className="profile-card-wrapper">
              <div className="profile-card-username">{profile.username}</div>
              <div className="profile-card-email">{profile.email}</div>
              <div className="profile-card-first-name">{profile.first_name} {profile.last_name} </div>
              <div className="role">
                <div className="role-title">Роль:</div>
                <div className="role-text">
                  {profile.role === 40 ? <div>Админ</div>
                      : profile.role === 30 ? <div>Работник офиса</div>
                          : profile.role === 20 ? <div>Работник склада</div> : null}
                </div>
              </div>
            </div>
        </div>
    )
}
export default ProfileAdminCard;