import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent, verifyAdmin } from "./services/api";
import { ArrowLeft, Lock } from "lucide-react";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    description: "",
    image: "",
    price: "",
    date: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const cities = [
    "Ahmedabad",
    "Bengaluru",
    "Delhi",
    "Jaipur",
    "Mumbai",
    "Vadodara",
    "Surat",
    "Udaipur",
    "Kolkata",
    "Indore",
    "Lucknow",
    "Nagpur",
    "Bhopal",
    "Visakhapatnam",
    "Kochi",
    "Coimbatore",
    "Ludhiana",
    "Ranchi",
    "Hyderabad",
    "Goa",
    "Chandigarh",
  ];

  // Check admin authorization on component mount
  useEffect(() => {
    checkAdminAuthorization();
  }, []);

  const checkAdminAuthorization = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const storedAdminEmail = localStorage.getItem("adminEmail");

      if (!adminToken) {
        setIsAuthorized(false);
        setError("Please login as admin first");
        setTimeout(() => navigate("/admin-login"), 2000);
        return;
      }

      // Verify token with backend
      const response = await verifyAdmin();
      if (response.data.isAdmin) {
        setIsAuthorized(true);
        setAdminEmail(storedAdminEmail);
      } else {
        setIsAuthorized(false);
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminId");
        localStorage.removeItem("adminEmail");
        setError("Admin authorization failed");
        setTimeout(() => navigate("/admin-login"), 2000);
      }
    } catch (err) {
      setIsAuthorized(false);
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminId");
      localStorage.removeItem("adminEmail");
      setError("Session expired. Please login again");
      setTimeout(() => navigate("/admin-login"), 2000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validation
    if (
      !formData.name ||
      !formData.city ||
      !formData.description ||
      !formData.image ||
      !formData.price ||
      !formData.date ||
      !formData.location
    ) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await createEvent({
        ...formData,
        price: parseFloat(formData.price),
      });
      setMessage("Event created successfully!");
      setFormData({
        name: "",
        city: "",
        description: "",
        image: "",
        price: "",
        date: "",
        location: "",
      });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "#1a1a1a",
      color: "white",
      padding: "20px",
    },
    navbar: {
      padding: "15px 20px",
      background: "#282c34",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
      borderRadius: "8px",
    },
    backBtn: {
      background: "transparent",
      color: "white",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "16px",
      fontWeight: "600",
      transition: "opacity 0.3s",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    formContainer: {
      maxWidth: "600px",
      margin: "0 auto",
      background: "#2a2a2a",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
    },
    formTitle: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "30px",
      textAlign: "center",
      color: "#667eea",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
      fontWeight: "600",
      color: "#ccc",
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #444",
      background: "#1a1a1a",
      color: "white",
      fontSize: "14px",
      boxSizing: "border-box",
      transition: "border-color 0.3s",
    },
    textarea: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #444",
      background: "#1a1a1a",
      color: "white",
      fontSize: "14px",
      boxSizing: "border-box",
      minHeight: "120px",
      fontFamily: "inherit",
      resize: "vertical",
    },
    select: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #444",
      background: "#1a1a1a",
      color: "white",
      fontSize: "14px",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "12px",
      background: "#667eea",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background 0.3s",
    },
    message: {
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "20px",
      textAlign: "center",
    },
    successMessage: {
      background: "#10b981",
      color: "white",
    },
    errorMessage: {
      background: "#dc2626",
      color: "white",
    },
  };

  // Show loading state while checking authorization
  if (isAuthorized === null) {
    return (
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p>Verifying admin credentials...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show unauthorized message
  if (!isAuthorized) {
    return (
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <div style={{ textAlign: "center", padding: "40px" }}>
            <Lock size={48} style={{ color: "#dc2626", marginBottom: "20px" }} />
            <h2 style={{ color: "#dc2626", marginBottom: "10px" }}>Access Denied</h2>
            <p style={{ color: "#aaa", marginBottom: "20px" }}>
              {error || "You are not authorized to access this page"}
            </p>
            <button
              style={{
                ...styles.button,
                background: "#667eea",
              }}
              onClick={() => navigate("/admin-login")}
              onMouseEnter={(e) => (e.target.style.background = "#5568d3")}
              onMouseLeave={(e) => (e.target.style.background = "#667eea")}
            >
              Go to Admin Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <button
          style={styles.backBtn}
          onClick={() => navigate("/home")}
          onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <span style={styles.title}>Event Platform - Admin Panel</span>
        <div style={{ fontSize: "12px", color: "#aaa" }}>
          {adminEmail && `Logged in as: ${adminEmail}`}
        </div>
      </div>

      <div style={styles.formContainer}>
        <h2 style={styles.formTitle}>Add New Event</h2>

        {message && (
          <div style={{ ...styles.message, ...styles.successMessage }}>
            {message}
          </div>
        )}

        {error && (
          <div style={{ ...styles.message, ...styles.errorMessage }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Event Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter event name"
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#444")}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>City *</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              style={styles.select}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#444")}
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter event description"
              style={styles.textarea}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#444")}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Image URL *</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Enter image URL"
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#444")}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Ticket Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter ticket price"
              min="0"
              step="0.01"
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#444")}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Event Date *</label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#444")}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Location/Venue *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter event location"
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#444")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) =>
              !loading && (e.target.style.background = "#5568d3")
            }
            onMouseLeave={(e) =>
              !loading && (e.target.style.background = "#667eea")
            }
          >
            {loading ? "Creating Event..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}
