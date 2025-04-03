import Logo from "../assets/logo.png";
import "../assets/styles/navBar.css";
import { CiMenuBurger } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import Login from "./login";
import SignUp from "./signup";
import { Logout } from "../services/auth";
function Navbar({setContent}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoginOpen,setIsLoginOpen] = useState(false)
  const [isSignInOpen,setIsSignInOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const handleLogoutClick = async() => {
    const response = await Logout();
    if(response.error) {
      alert(response.error === "Failed to fetch" ? "Some error occured please try again later":response.error);
      return;
    }
    alert("Logout successfull");
    setIsLoggedIn(false);
  }

  return (
    <div className="nav-bar-container">
      <nav>
        <ul>
          <li>
            <img className="logo-img" src={Logo} alt="" />
          </li>
          <li className="nav-btns">
            <button className="nav-btn" onClick={()=>setContent("Houses")}>Houses</button>
            <button className="nav-btn" onClick={()=>setContent("Lands")}>Lands</button>
          </li>
          <li className="custom-select">
            <div className="select-header" onClick={toggleDropdown}>
              {selectedOption ? selectedOption : (
                <div className="icons">
                  <CiMenuBurger className="icon" />
                  <FaUser />
                </div>
              )}
            </div>
            {isOpen && (
              <ul className="select-options">
                {!isLoggedIn &&  
                <li onClick={() => {handleOptionClick("Login");setIsLoginOpen(true);setIsSignInOpen(false)}}>Login</li>
                }
                {isLoggedIn && 
                  <li className="lgt-btn" onClick={()=>{handleOptionClick("Logout");handleLogoutClick()}}>Logout</li>
                }
                <li onClick={() => {handleOptionClick("Sign-up");setIsLoginOpen(false);setIsSignInOpen(true)}}>Sign-up</li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
      {isLoginOpen && <Login onClose={()=>setIsLoginOpen(false)} onLogin={()=>setIsLoggedIn(true)} onRegisterClick={()=>{setIsLoginOpen(false);setIsSignInOpen(true)}}/>}
      {isSignInOpen && <SignUp onClose={()=>setIsSignInOpen(false)} onLoginClick={()=>{setIsSignInOpen(false);setIsLoginOpen(true)}}/>}
    </div>
  );
}

export default Navbar;