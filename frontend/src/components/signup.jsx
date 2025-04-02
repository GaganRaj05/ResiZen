import { useEffect, useState } from "react";
import "../assets/styles/login.css"
function SignUp({onClose}) {
    const [formData, setFormData] = useState({email:"",password:""});
    const [error, setError] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    
    const handleChange = (e)=> {
        setError("");
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit = async(e)=> {
        
    
        setIsLoading(true)
        setError("");
        e.preventDefault();
        alert("successfull")
    }

    return (
        <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={onClose}>&times;</button>
          <h2 className="text-center text-xl font-semibold mb-4 text-white">Login</h2>
  
          <form method="POST" onSubmit={handleSubmit}>
            {error && (<p className="err-message">{error}</p>)}
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="text" placeholder="Enter your email id" onChange={handleChange} value={formData.email} required />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Enter your password" onChange={handleChange} value={formData.password} required />
            <button type="submit" className="login-submit" disabled={isLoading}>Submit</button>
          </form>
          <p>Not a user yet ?<a href="" ><button style={{border:"0px",color:"gold",fontSize:"20px",backgroundColor:"#0d1114",cursor:"pointer"}} onClick={()=>onClose()}>Register</button></a></p>
        </div>
      </div>
      )
}
export default SignUp;