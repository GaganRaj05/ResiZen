import { useState, useEffect } from "react";
import {Get_Users,Delete_User} from "../services/admin";
import SignUp from "./signup";
import PropertyForm from "./propertyForm";
import LandForm from "./landForm";
import Delete_Property from "./adminDeleteProperties";
import Delete_Land from "./adminDeleteLand";
function AdminControls({ type }) {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    useEffect(() => {
        async function getUsers() {
            const response = await Get_Users();
            if (response.error) {
                setError(response.error === "Failed to fetch" ? 
                    "Some error occurred, please try again later" : response.error);
                return;
            }
            console.log(response);
            setUsers(response);
        }
        getUsers();
    }, []);

    const handleDeleteBtnClick = async(e, user_id) => {
        e.preventDefault();
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
        const response = await Delete_User(user_id);
        if (response.error) {
            setError(response.error === "Failed to fetch" ? 
                "Some error occurred, please try again later" : response.error);
            alert(error);
            return;
        }
        setUsers(users.filter(user => user.email !== user_id));
        console.log(response)
        alert(response);
        return;

    };

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleNewUser = (newUser) => {
        setUsers(prevUsers => [...prevUsers, newUser]);
    };
    
    return (
        <div className="admin-control-container">
            <h1>Hello Srujan SM, </h1>
            <h3>Manage your Application Here 🛠</h3>

            {!type && (
                <div className="dashboard_instructions">
                    <h4>What you can do in this Dashboard?..</h4>
                    <h4 style={{ marginTop: "10px" }}>1. Add Users.</h4>
                    <h4>2. Delete Users.</h4>
                    <h4>3. Add Properties.</h4>
                    <h4>4. Delete Properties.</h4>
                    <h4>5. Add Land.</h4>
                    <h4>6. Delete Land.</h4>
                    <h2 id="instructions-footer">Use the sidebar to control your application 🖥</h2>
                </div>
            )}

            {type === "Users" && (
                <div className="admin-user-controls_container">
                    <div className="search-bar-container">
                        <input 
                            type="text" 
                            placeholder="Search for users" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit">Submit</button>
                        <button className="user-btns" onClick={()=>{setIsSignUpOpen(true)}}>Add user</button>
                    </div>

                    <div className="user-display">
                        {filteredUsers.map((user) => (
                            <div className="User-cards" key={user._id}>
                                <div className="user-pic">
                                    <img src={user.image} alt="" />
                                </div>
                                <div className="user-info">
                                    <p>{user.name}</p>
                                    <p>{user.email}</p>
                                </div>
                                <button className="dlt-user-btns" 
                                    onClick={(e) => handleDeleteBtnClick(e, user.email)}>
                                    Delete-user
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        {type === "Add Property" && <PropertyForm/>}
        {type === "Add Land" && <LandForm/>}
        {type === "Delete Property" && <Delete_Property/>}
        {type === "Delete Land" && <Delete_Land/>}
{isSignUpOpen && <SignUp onClose={() => setIsSignUpOpen(false)} adminForm={true} addUser={handleNewUser} />}
</div>
    );
}

export default AdminControls;
