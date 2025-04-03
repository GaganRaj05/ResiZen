import { useState } from "react";
import "../assets/styles/sideBar.css";
import Logo from "../assets/logo.png"
import { Logout } from "../services/auth";
import {useNavigate} from "react-router-dom";
function SideBar({onSideBarClick}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogoutClick = async(e)=> {
    const response = await Logout();
    if(response.error) {
      setError(response.error === "Failed to fetch" ? "Some error occured please try again later" : response.error);
      return;
    }
    alert("Logout successfull");
    navigate("/")
  }
  return (
    <div className={`side-bar-container ${isCollapsed ? "collapsed" : ""}`}>
      <button
        className="sidebar-toggle-btn"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? "➤" : "❮"}
      </button>

      {!isCollapsed && (
        <div className="side-bar-controls-container">
          <div className="side-bar-controls">
            <button style={{disabled:"true"}} className="side-bar-head" onClick={()=>onSideBarClick("")}>
                Resizen
            </button>
            <button id="side-bar-controls-btn1" onClick={()=>{onSideBarClick("Users")}}>Users</button>
            <button onClick={()=>{onSideBarClick("Add Property")}}>Add property</button>
            <button onClick={()=>{onSideBarClick("Delete Property")}}>Delete Properties</button>
            <button onClick={()=>{onSideBarClick("Add Land")}}>Add land</button>
            <button onClick={()=>{onSideBarClick("Delete Land")}}>Delete Land</button>
          </div>

          <div className="side-bar-settings-container">
            <button onClick={handleLogoutClick} className="logout-btn">Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
