import { useState } from "react";
import SideBar from "../components/adminSideBar";
import AdminControls from "../components/adminControls";

import "../assets/styles/admin.css"
function AdminPage() {
    const [controlType,setControlType] = useState("");
    return (
        <div className="admin-page-container">
            <SideBar onSideBarClick={(type)=>{setControlType(type)}}/>
            <AdminControls type={controlType}/>
        </div>
    )
}
export default AdminPage;