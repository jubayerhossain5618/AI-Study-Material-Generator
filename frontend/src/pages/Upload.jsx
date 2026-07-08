import { useState } from "react";
import { Link } from "react-router-dom";

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:5000/api/documents/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Upload failed");
        return;
      }

      alert("File uploaded successfully!");
      console.log("Uploaded document:", data);
    } catch (error) {
      alert("Upload error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-card">
        <h2>📤 Upload Study Material</h2>
        <p>Upload PDF, DOCX or TXT files to generate AI notes.</p>

        <div className="upload-box">
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
          />

          {file && (
            <div className="selected-file">
              <strong>Selected:</strong> {file.name}
            </div>
          )}
        </div>

        <button
          className="upload-main-btn"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Now"}
        </button>

        <Link to="/dashboard" className="back-link">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Upload;