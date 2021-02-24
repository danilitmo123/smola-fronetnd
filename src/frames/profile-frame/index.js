import SideBar from "../../components/side-bar";
import Header from "../../components/header";
import React from "react";
import ProfileScreen from "../../screens/profile-screen";

export const ProfileFrame = () => {
    return (
        <div className={'App'}>
            <SideBar/>
            <ProfileScreen/>
        </div>
    )
}