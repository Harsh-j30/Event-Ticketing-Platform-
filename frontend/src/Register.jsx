import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./services/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
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
      const res = await registerUser(form);
      alert(res.data.message);
      setForm({ name: "", email: "", password: "" });
      
      // Navigate to login page after successful registration
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
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
      borderColor: "#d4dbf8",
      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
    },
    button: {
      padding: "12px",
      background: "linear-gradient(135deg, #0A0A0A 0%, #0e4231 100%)",
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
      boxShadow: "0 5px 15px rgba(26, 100, 51, 0.86)",
    },
    buttonDisabled: {
      opacity: "0.7",
      cursor: "not-allowed",
    },
  };

  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={form.name}
            onFocus={() => setFocusedInput("name")}
            onBlur={() => setFocusedInput(null)}
            style={{
              ...styles.input,
              ...(focusedInput === "name" ? styles.inputFocus : {}),
            }}
            required
          />

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
            {loading ? "Registering..." : "Register"}
          </button>

           <p style={styles.link}>
          already registered? <a href="/login" style={styles.linkButton}>Login here</a>
        </p>
        </form>
      </div>
    </div>
  );
}
