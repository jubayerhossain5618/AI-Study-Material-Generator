import { Link } from "react-router-dom";

function Profile() {
  const token = localStorage.getItem("token");

  return (
    <div className="page-shell">
      <div className="generator-card">
        <h1>👤 Profile</h1>
        <p>Your account profile page.</p>

        <p>
          <strong>Status:</strong>{" "}
          {token ? "Logged in successfully" : "Not logged in"}
        </p>

        <Link to="/dashboard">
          <button>Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default Profile;