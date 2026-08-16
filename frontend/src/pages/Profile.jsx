import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Load Profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Unable to load profile.");
          return;
        }

        setProfile({
          name: data.name || "",
          email: data.email || "",
          role: data.role || "student",
        });
      } catch (error) {
        console.error("Profile loading error:", error);
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token]);

  // Update Profile
  const updateProfile = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!profile.name.trim() || !profile.email.trim()) {
      setError("Name and email are required.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: profile.name,
            email: profile.email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Profile update failed.");
        return;
      }

      setProfile({
        name: data.name,
        email: data.email,
        role: data.role,
      });

      setMessage("Profile updated successfully.");
      setEditMode(false);
    } catch (error) {
      console.error("Profile update error:", error);
      setError("Unable to connect to the server.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="generator-card">
        <h1>👤 Profile</h1>
        <p>View and manage your account information.</p>

        {loading ? (
          <p>Loading profile...</p>
        ) : (
          <>
            {error && (
              <p style={{ color: "red" }}>
                {error}
              </p>
            )}

            {message && (
              <p style={{ color: "green" }}>
                {message}
              </p>
            )}

            <form onSubmit={updateProfile}>
              <div style={{ marginBottom: "15px" }}>
                <label>
                  <strong>Name</strong>
                </label>

                <br />

                {editMode ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p>{profile.name}</p>
                )}
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label>
                  <strong>Email</strong>
                </label>

                <br />

                {editMode ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p>{profile.email}</p>
                )}
              </div>

              <div style={{ marginBottom: "20px" }}>
                <strong>Role</strong>
                <p>{profile.role}</p>
              </div>

              {editMode ? (
                <>
                  <button
                    type="submit"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setMessage("");
                      setError("");
                    }}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                >
                  ✏️ Edit Profile
                </button>
              )}
            </form>

            <div style={{ marginTop: "20px" }}>
              <Link to="/dashboard">
                <button>Back to Dashboard</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;