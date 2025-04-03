import { useEffect, useState } from "react";
import "../assets/styles/login.css";
import { login } from "../services/auth";
import {useNavigate} from "react-router-dom";
function Login({ onClose,onLogin,onRegisterClick }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setIsLoading(false);
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    setError("");

    e.preventDefault();
    const response = await login(formData);
    if (response.error) {
      setError(
        response.error === "Failed to fetch"
          ? "Some error occured please try again later"
          : response.error
      );
      return;
    }
    if(response === "Logged in Successfully as admin") {
      alert(response);
      navigate("/admin-dashboard");
      return;
    }
    onLogin()
    setIsLoading(false);
    alert("Login Successfull");
    onClose();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-center text-xl font-semibold mb-4 text-white">
          Login
        </h2>

        <form method="POST" onSubmit={handleSubmit}>
          {error && <p className="err-message">{error}</p>}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Enter your email id"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <button type="submit" className="login-submit" disabled={isLoading}>
            Submit
          </button>
        </form>
        <p>
          Not a user yet ?<a href="" onClick={(e)=>{e.preventDefault();onRegisterClick()}}>Register.</a>
        </p>
      </div>
    </div>
  );
}
export default Login;
