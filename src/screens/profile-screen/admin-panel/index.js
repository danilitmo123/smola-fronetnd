import ProfileAdminList from "./list-user";
import AddUser from "./create-user";

const AdminPanel = () => {
    return (
        <div>
            <ProfileAdminList/>
            <AddUser/>
        </div>
    )
}

export default AdminPanel;