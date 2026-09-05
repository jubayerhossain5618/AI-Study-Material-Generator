import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDocuments: 0,
    totalMaterials: 0,
    totalChats: 0,
  });

  const [users, setUsers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [chats, setChats] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // =========================
  // LOAD ADMIN DATA
  // =========================

  const loadAdminData = async () => {
    const token = localStorage.getItem("token");

    try {
      const [
        statsResponse,
        usersResponse,
        documentsResponse,
        chatsResponse,
      ] = await Promise.all([
        fetch("http://localhost:5000/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        fetch("http://localhost:5000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        fetch("http://localhost:5000/api/admin/documents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        fetch("http://localhost:5000/api/admin/chats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const statsData = await statsResponse.json();
      const usersData = await usersResponse.json();
      const documentsData = await documentsResponse.json();
      const chatsData = await chatsResponse.json();

      if (!statsResponse.ok) {
        setError(
          statsData.message ||
            "Unable to load admin statistics."
        );
        return;
      }

      if (!usersResponse.ok) {
        setError(
          usersData.message ||
            "Unable to load users."
        );
        return;
      }

      if (!documentsResponse.ok) {
        setError(
          documentsData.message ||
            "Unable to load documents."
        );
        return;
      }

      if (!chatsResponse.ok) {
        setError(
          chatsData.message ||
            "Unable to load chat history."
        );
        return;
      }

      setStats(statsData);
      setUsers(usersData);
      setDocuments(documentsData);
      setChats(chatsData);

      setError("");

    } catch (error) {
      console.error(
        "Admin dashboard error:",
        error
      );

      setError(
        "Unable to connect to the server."
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadAdminData();
  }, []);


  // =========================
  // DELETE USER
  // =========================

  const deleteUser = async (
    userId,
    userName
  ) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${userName}?`
    );

    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${userId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to delete user."
        );
        return;
      }

      alert(
        data.message ||
          "User deleted successfully."
      );

      await loadAdminData();

    } catch (error) {
      console.error(
        "Delete user error:",
        error
      );

      alert(
        "Unable to connect to the server."
      );
    }
  };


  // =========================
  // DELETE DOCUMENT
  // =========================

  const deleteDocument = async (
    documentId,
    fileName
  ) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${fileName}?`
    );

    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/documents/${documentId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to delete document."
        );
        return;
      }

      alert(
        data.message ||
          "Document deleted successfully."
      );

      await loadAdminData();

    } catch (error) {
      console.error(
        "Delete document error:",
        error
      );

      alert(
        "Unable to connect to the server."
      );
    }
  };


  return (
    <div className="page-shell">

      <div className="generator-card">

        <h1>🛠️ Admin Dashboard</h1>

        <p>
          Manage and monitor the AI Study
          Material Generator system.
        </p>


        {loading && (
          <p>Loading admin data...</p>
        )}


        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}


        {!loading && !error && (
          <>

            {/* ========================= */}
            {/* SYSTEM OVERVIEW */}
            {/* ========================= */}

            <h2>System Overview</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "20px",
                marginTop: "20px",
                marginBottom: "35px",
              }}
            >

              <div className="stat-card">
                <h2>
                  👥 {stats.totalUsers}
                </h2>
                <p>Total Users</p>
              </div>


              <div className="stat-card">
                <h2>
                  📄 {stats.totalDocuments}
                </h2>
                <p>Total Documents</p>
              </div>


              <div className="stat-card">
                <h2>
                  🤖 {stats.totalMaterials}
                </h2>
                <p>Generated Materials</p>
              </div>


              <div className="stat-card">
                <h2>
                  💬 {stats.totalChats}
                </h2>
                <p>AI Chats</p>
              </div>

            </div>


            {/* ========================= */}
            {/* USER MANAGEMENT */}
            {/* ========================= */}

            <h2>👥 User Management</h2>

            {users.length === 0 ? (

              <p>No users found.</p>

            ) : (

              <div style={tableWrapperStyle}>

                <table style={tableStyle}>

                  <thead>
                    <tr>

                      <th style={tableHeaderStyle}>
                        Name
                      </th>

                      <th style={tableHeaderStyle}>
                        Email
                      </th>

                      <th style={tableHeaderStyle}>
                        Role
                      </th>

                      <th style={tableHeaderStyle}>
                        Action
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {users.map((user) => (

                      <tr key={user._id}>

                        <td style={tableCellStyle}>
                          {user.name}
                        </td>

                        <td style={tableCellStyle}>
                          {user.email}
                        </td>

                        <td style={tableCellStyle}>
                          {user.role}
                        </td>

                        <td style={tableCellStyle}>

                          {user.role === "admin" ? (

                            <span
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              🔒 Protected
                            </span>

                          ) : (

                            <button
                              onClick={() =>
                                deleteUser(
                                  user._id,
                                  user.name
                                )
                              }
                              style={
                                deleteButtonStyle
                              }
                            >
                              Delete
                            </button>

                          )}

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}


            {/* ========================= */}
            {/* DOCUMENT MANAGEMENT */}
            {/* ========================= */}

            <h2>📄 Uploaded Documents</h2>

            {documents.length === 0 ? (

              <p>No documents found.</p>

            ) : (

              <div style={tableWrapperStyle}>

                <table style={tableStyle}>

                  <thead>
                    <tr>

                      <th style={tableHeaderStyle}>
                        File Name
                      </th>

                      <th style={tableHeaderStyle}>
                        Uploaded By
                      </th>

                      <th style={tableHeaderStyle}>
                        Email
                      </th>

                      <th style={tableHeaderStyle}>
                        Action
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {documents.map((doc) => (

                      <tr key={doc._id}>

                        <td style={tableCellStyle}>
                          📄 {doc.fileName}
                        </td>

                        <td style={tableCellStyle}>
                          {doc.userId?.name ||
                            "Unknown User"}
                        </td>

                        <td style={tableCellStyle}>
                          {doc.userId?.email ||
                            "N/A"}
                        </td>

                        <td style={tableCellStyle}>

                          <button
                            onClick={() =>
                              deleteDocument(
                                doc._id,
                                doc.fileName
                              )
                            }
                            style={
                              deleteButtonStyle
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}


            {/* ========================= */}
            {/* AI CHAT HISTORY */}
            {/* ========================= */}

            <h2>💬 AI Chat History</h2>

            {chats.length === 0 ? (

              <p>No chat history found.</p>

            ) : (

              <div style={tableWrapperStyle}>

                <table style={tableStyle}>

                  <thead>
                    <tr>

                      <th style={tableHeaderStyle}>
                        User
                      </th>

                      <th style={tableHeaderStyle}>
                        Email
                      </th>

                      <th style={tableHeaderStyle}>
                        Question
                      </th>

                      <th style={tableHeaderStyle}>
                        AI Answer
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {chats.map((chat) => (

                      <tr key={chat._id}>

                        <td style={tableCellStyle}>
                          {chat.userId?.name ||
                            "Unknown User"}
                        </td>

                        <td style={tableCellStyle}>
                          {chat.userId?.email ||
                            "N/A"}
                        </td>

                        <td style={tableCellStyle}>
                          {chat.question ||
                            "No question"}
                        </td>

                        <td
                          style={{
                            ...tableCellStyle,
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {chat.answer ||
                            "No answer"}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </>
        )}


        <Link to="/dashboard">
          <button>
            Back to Dashboard
          </button>
        </Link>

      </div>

    </div>
  );
}


// =========================
// TABLE STYLES
// =========================

const tableWrapperStyle = {
  overflowX: "auto",
  marginTop: "15px",
  marginBottom: "35px",
};


const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};


const tableHeaderStyle = {
  textAlign: "left",
  padding: "12px",
  borderBottom: "1px solid #ddd",
};


const tableCellStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  verticalAlign: "top",
};


const deleteButtonStyle = {
  background: "#dc3545",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};


export default AdminDashboard;