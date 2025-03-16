import React, { useState, useContext } from "react";
import { login } from "../../repositories/AuthRepo"; 
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // Correct named import
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../UserContext"; 

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    if (!username || !password) {
      toast.error("Both username and password are required.", { position: "top-center" });
      return;
    }

    try {
      const response = await login({ username, password });

      if (response && response.token) {
        const decodedToken = jwtDecode(response.token); // Use named import
        const { sub: username, roles, userId, exp } = decodedToken;

        if (!username || !roles || !userId || !exp) {
          toast.error("Invalid token. Please contact support.", { position: "top-center" });
          return;
        }

        const currentTime = Math.floor(Date.now() / 1000);
        if (exp < currentTime) {
          toast.error("Session expired. Please log in again.", { position: "top-center" });
          return;
        }

        localStorage.setItem("token", response.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ username, roles, userId })
        );

        setUser({ username, roles, userId });

        toast.success("Login successful!", { position: "top-center" });

        if (roles.includes("USER") || roles.includes("ADMIN") || roles.includes("DRIVER")) {
          navigate("/");
        } else {
          toast.error("Unknown role. Please contact support.", { position: "top-center" });
        }
        
      } else {
        toast.error("Invalid username or password. Please try again.", { position: "top-center" });
      }
    } catch (err) {
      console.error("Error during login:", err);
      toast.error("An unexpected error occurred. Please try again later.", { position: "top-center" });
    }
  };

  return (
    <div className="form-container sign-in-container" data-testid="sign-in-container">
      <form onSubmit={handleSubmit}>
        <h1 className="register-form">Sign In</h1>
        
        <span>Please enter your credentials:</span>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          data-testid="username-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          data-testid="password-input"
        />
        <button type="submit" data-testid="sign-in-submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
