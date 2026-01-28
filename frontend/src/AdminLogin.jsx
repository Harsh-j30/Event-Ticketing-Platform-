import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { adminLogin } from "./services/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Access</h2>
        <p style={styles.subtitle}>Login with admin credentials</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            <Mail size={16} /> Admin Email
          </label>
          <div style={styles.inputBox}>
            <input
              type="email"
              name="email"
              placeholder="admin@email.com"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          <label style={styles.label}>
            <Lock size={16} /> Password
          </label>
          <div style={styles.inputBox}>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          <button style={styles.loginBtn} disabled={loading}>
            {loading ? "Logging in..." : "Login as Admin"}
          </button>

          <button
            type="button"
            style={styles.backBtn}
            onClick={() => navigate("/home")}
          >
            Back to Home
          </button>
        </form>

        <p style={styles.footer}>
          Only authorized admins can access the event management panel
        </p>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #000000 20%, #0e4231 90%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "rgba(0,0,0,0.85)",
    borderRadius: "14px",
    padding: "40px",
    color: "white",
    boxShadow: "0 15px 40px rgba(0,0,0,0.7)",
  },
  title: {
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "700",
  },
  subtitle: {
    textAlign: "center",
    fontSize: "14px",
    color: "#9ca3af",
    marginBottom: "25px",
  },
  form: {
    display: "grid",
    gap: "14px",
  },
  label: {
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  inputBox: {
    background: "white",
    borderRadius: "8px",
    padding: "10px",
  },
  input: {
    width: "100%",
    border: "none",
    outline: "none",
    fontSize: "14px",
  },
  loginBtn: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#0e4231",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  },
  backBtn: {
    background: "transparent",
    border: "1px solid #1f2937",
    color: "#9ca3af",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  error: {
    background: "#dc2626",
    padding: "10px",
    borderRadius: "6px",
    textAlign: "center",
  },
  footer: {
    marginTop: "20px",
    fontSize: "12px",
    textAlign: "center",
    color: "#9ca3af",
  },
};
