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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const response = await adminLogin(formData);
      
      // Store admin token
      localStorage.setItem("adminToken", response.data.adminToken);
      localStorage.setItem("adminId", response.data.adminId);
      localStorage.setItem("adminEmail", response.data.adminEmail);
      
      // Navigate to admin panel
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
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    background: "rgba(10, 10, 10, 0.85)",   // black + opacity
    borderRadius: "12px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
    padding: "40px",
    width: "100%",
    maxWidth: "450px",
    color: "white",
    backdropFilter: "blur(10px)",
  },

  header: {
    textAlign: "center",
    marginBottom: "30px",
  },

  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "white",   // ✅ White header as you asked
  },

  subtitle: {
    fontSize: "14px",
    color: "#cfd7d4",
  },

  formGroup: {
    marginBottom: "20px",
  },

  label: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#e6fff6",
    gap: "8px",
  },

  inputContainer: {
    display: "flex",
    alignItems: "center",
     background: "white", 
    borderRadius: "8px",
    border: "1px solid #1f5f4a",
    padding: "12px 15px",
    transition: "all 0.3s",
  },

  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "14px",
    outline: "none",
  },

  icon: {
    color: "#2fd9a6",
    marginRight: "10px",
  },

  errorMessage: {
    background: "#dc2626",
    color: "white",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
    textAlign: "center",
    borderLeft: "4px solid #991b1b",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #242323 0%, #0e4231 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
    marginBottom: "15px",
  },

  backButton: {
    width: "100%",
    padding: "12px",
    background: "rgba(10, 10, 10, 0.7)",
    color: "#cfd7d4",
    border: "1px solid #1f5f4a",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
  },

  footer: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "12px",
    color: "#9ca3af",
  },
};


  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Admin Access</h1>
          <p style={styles.subtitle}>Login with admin credentials</p>
        </div>

        {error && <div style={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <Mail size={18} style={styles.icon} />
              Admin Email
            </label>
            <div style={styles.inputContainer}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your admin email"
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <Lock size={18} style={styles.icon} />
              Password
            </label>
            <div style={styles.inputContainer}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                style={styles.input}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) =>
              !loading && (e.target.style.transform = "translateY(-2px)")
            }
            onMouseLeave={(e) =>
              !loading && (e.target.style.transform = "translateY(0)")
            }
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>

          <button
            type="button"
            style={styles.backButton}
            onClick={() => navigate("/home")}
            onMouseEnter={(e) => {
              e.target.style.background = "#333";
              e.target.style.borderColor = "#5ab88c";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#2a2a2a";
              e.target.style.borderColor = "#333";
            }}
          >
            Back to Home
          </button>
        </form>

        <div style={styles.footer}>
          <p>Only authorized admins can access the event management panel</p>
        </div>
      </div>
    </div>
  );
}
