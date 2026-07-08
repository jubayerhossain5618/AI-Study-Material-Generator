import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Register failed");
      return;
    }

    alert("Register successful");
    navigate("/login");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Create Account 🚀</h2>
        <p>Register to start generating AI study materials.</p>

        <form onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Full Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />

          <button type="submit">Register</button>
        </form>

        <p className="bottom-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;