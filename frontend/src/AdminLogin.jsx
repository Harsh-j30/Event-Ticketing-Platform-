import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { adminLogin } from "./services/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const { data } = await adminLogin(formData);

      // ✅ SAFELY STORE TOKEN (adjust to backend response)
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminId", data.admin._id);
      localStorage.setItem("adminEmail", data.admin.email);

      navigate("/admin/add-event");
    } catch (err) {
      setError(err.response?.data?.message || "Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0A0A0A 10%, #0e4231 90%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    card: {
      background: "rgba(10,10,10,0.9)",
      padding: "40px",
      borderRadius: "12px",
      width: "100%",
      maxWidth: "420px",
      color: "white",
    },

    inputContainer: {
      display: "flex",
      alignItems: "center",
      background: "white",
      borderRadius: "8px",
      padding: "12px",
    },

    input: {
      flex: 1,
      border: "none",
      outline: "none",
      fontSize: "14px",
      color: "#000", // ✅ FIXED
    },

    button: {
      width: "100%",
      padding: "12px",
      marginTop: "10px",
      background: "#0e4231",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    },

    error: {
      background: "#dc2626",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "6px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ textAlign: "center" }}>Admin Login</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div>
            <label><Mail size={16} /> Email</label>
            <div style={styles.inputContainer}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
          </div>

          <div>
            <label><Lock size={16} /> Password</label>
            <div style={styles.inputContainer}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
          </div>

          <button style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
