import { useState } from "react";
import "../assets/styles/signup.css";
import {Sign_up} from "../services/auth";
function SignUp({ onClose,adminForm,addUser,onLoginClick }) {
    const [formData, setFormData] = useState({
        name: "", 
        email: "", 
        password: "", 
        confirmPassword: "", 
        phone: "", 
        address: "", 
        file: null
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        setError("");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setFormData({ ...formData, file });
        }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");
  
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("confirmPassword", formData.confirmPassword);
      data.append("phone", formData.phone);
      data.append("address", formData.address);
      if (formData.file) {
          data.append("image", formData.file);
      }
  
      const response = await Sign_up(data);
      if(response.error) {
          setIsLoading(false);
          setError(response.error === "Failed to fetch" ? "Some error occurred, please try again later" : response.error);
          return;
      }
  
      const fileExtension = formData.file.name.split('.').pop(); 
      const newUser = {
          name: formData.name,
          email: formData.email,
          image: `http://localhost:5000/uploads/${formData.file.name}`            
      };
  
      setIsLoading(false);
      alert("New user added successfully");
      
      if (adminForm) {
          addUser(newUser);
      }
  
      onClose();
  };
  
    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>
                <h2 className="text-center text-xl font-semibold mb-4 text-white">Sign Up</h2>

                <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
                    {error && (<p className="err-message">{error}</p>)}

                    <label htmlFor="image">Profile Picture</label>
                    <input id="image" type="file" accept="image/*" name="image" onChange={handleFileChange} />
                    {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}

                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" name="name" placeholder="Enter your name" onChange={handleChange} value={formData.name} required />

                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" placeholder="Enter your email" onChange={handleChange} value={formData.email} required />

                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" placeholder="Enter your password" onChange={handleChange} value={formData.password} required />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm password" onChange={handleChange} value={formData.confirmPassword} required />

                    <label htmlFor="phone">Phone</label>
                    <input id="phone" type="text" name="phone" placeholder="Enter your phone number" onChange={handleChange} value={formData.phone} required />

                    <label htmlFor="address">Address</label>
                    <input id="address" type="text" name="address" placeholder="Enter your address" onChange={handleChange} value={formData.address} required />

                    <button type="submit" className="login-submit" disabled={isLoading}>
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                </form>

              {!adminForm && (
                                <p >Already a user? 
                                <a href="#" >
                                    <button disabled={adminForm} style={{ border: "0px", color: "gold", fontSize: "20px", backgroundColor: "#0d1114", cursor: "pointer" }} onClick={(e)=>{e.preventDefault();onLoginClick()}}>
                                        Login
                                    </button>
                                </a>
                            </p>
            
              )}
            </div>
        </div>
    );
}

export default SignUp;
