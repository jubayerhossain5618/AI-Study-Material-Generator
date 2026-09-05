import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <div className="logo">⚡</div>
        <span>AI Study MaterialsGen</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <a href="#features">Features</a>
        <a href="#about">About</a>
        <Link to="/login">Login</Link>
        <Link to="/register" className="nav-btn">
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;