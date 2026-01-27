import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./services/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(form);
      alert(res.data.message);

      // Save JWT token
      localStorage.setItem("token", res.data.token);
      setForm({ email: "", password: "" });
      
      // Redirect to home page
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0A0A0A 10%, #0e4231 90%)",
      padding: "20px",
    },
    card: {
      background: "white",
      padding: "40px",
      borderRadius: "10px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      width: "100%",
      maxWidth: "400px",
    },
    title: {
      textAlign: "center",
      color: "#333",
      marginBottom: "30px",
      fontSize: "28px",
      fontWeight: "600",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    input: {
      padding: "12px 15px",
      border: "2px solid #e0e0e0",
      borderRadius: "5px",
      fontSize: "14px",
      fontFamily: "Arial, sans-serif",
      transition: "all 0.3s ease",
      outline: "none",
    },
    inputFocus: {
      borderColor: "#667eea",
      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
    },
    button: {
      padding: "12px",
      background: "linear-gradient(135deg, #0A0A0A 10%, #0e4231 90%)",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      marginTop: "10px",
    },
    buttonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 5px 15px rgba(102, 126, 234, 0.4)",
    },
    buttonDisabled: {
      opacity: "0.7",
      cursor: "not-allowed",
    },
    // link: {
    //   textAlign: "center",
    //   marginTop: "15px",
    //   color: "#666",
    //   fontSize: "14px",
    // },
    // linkButton: {
    //   color: "#667eea",
    //   cursor: "pointer",
    //   textDecoration: "none",
    //   fontWeight: "600",
    // },
  };

  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            value={form.email}
            onFocus={() => setFocusedInput("email")}
            onBlur={() => setFocusedInput(null)}
            style={{
              ...styles.input,
              ...(focusedInput === "email" ? styles.inputFocus : {}),
            }}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            onFocus={() => setFocusedInput("password")}
            onBlur={() => setFocusedInput(null)}
            style={{
              ...styles.input,
              ...(focusedInput === "password" ? styles.inputFocus : {}),
            }}
            required
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                Object.assign(e.target.style, styles.buttonHover);
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.link}>
          Don't have an account? <a href="/register" style={styles.linkButton}>Register here</a>
        </p>
      </div>
    </div>
  );
}
