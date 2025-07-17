import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        userInput, 
        password,
      })
      navigate("/");
    }
    catch(error){console.log(error), alert("Please fill in both fields")};
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login with your username or phone number</p>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Username or Phone Number"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Login</button>
          
        <p style={styles.redirectText}>
          Don't haven an Account yet? Register with us <span style={styles.link} onClick={() => navigate("/reg")}>Register</span>
        </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #ece9e6, #ffffff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  title: {
    marginBottom: "0.5rem",
    color: "#333",
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
   link: {
    color: "#3b82f6",
    cursor: "pointer",
    textDecoration: "underline",
  },
    redirectText: {
    marginTop: "1rem",
    fontSize: "0.85rem",
    color: "#666",
  },
};

export default LoginPage;