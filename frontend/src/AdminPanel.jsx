// import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { createEvent, verifyAdmin } from "./services/api";
// import { ArrowLeft, Lock } from "lucide-react";

// export default function AdminPanel() {
//   const navigate = useNavigate();
//   const [isAuthorized, setIsAuthorized] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     city: "",
//     description: "",
//     image: "",
//     price: "",
//     date: "",
//     location: "",
//   });

//   const cities = [
//     "Ahmedabad","Bengaluru","Delhi","Jaipur","Mumbai","Vadodara","Surat",
//     "Udaipur","Kolkata","Indore","Lucknow","Nagpur","Bhopal",
//     "Visakhapatnam","Kochi","Coimbatore","Ludhiana","Ranchi",
//     "Hyderabad","Goa","Chandigarh",
//   ];

//   const checkAdminAuthorization = useCallback(async () => {
//     try {
//       const token = localStorage.getItem("adminToken");

//       if (!token) {
//         setIsAuthorized(false);
//         navigate("/admin-login");
//         return;
//       }

//       const res = await verifyAdmin();
//       if (res.data.isAdmin) {
//         setIsAuthorized(true);
//       } else {
//         throw new Error("Unauthorized");
//       }
//     } catch {
//       localStorage.clear();
//       setIsAuthorized(false);
//       navigate("/admin-login");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     checkAdminAuthorization();
//   }, [checkAdminAuthorization]);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     if (Object.values(formData).some(v => !v)) {
//       setError("All fields are required");
//       return;
//     }

//     try {
//       setLoading(true);
//       await createEvent({ ...formData, price: Number(formData.price) });
//       setMessage("Event created successfully!");
//       setFormData({
//         name: "", city: "", description: "", image: "",
//         price: "", date: "", location: "",
//       });
//       setTimeout(() => navigate("/home"), 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to create event");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (isAuthorized === null) {
//     return <p style={{ color: "white", textAlign: "center" }}>Checking admin access...</p>;
//   }

//   if (!isAuthorized) {
//     return (
//       <div style={{ textAlign: "center", color: "white" }}>
//         <Lock size={40} />
//         <p>Access Denied</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: 20, color: "white" }}>
//       <button onClick={() => navigate("/home")}><ArrowLeft /> Back</button>
//       <h2>Add New Event</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {message && <p style={{ color: "green" }}>{message}</p>}

//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Event Name" value={formData.name} onChange={handleInputChange} />
//         <select name="city" value={formData.city} onChange={handleInputChange}>
//           <option value="">Select City</option>
//           {cities.map(c => <option key={c}>{c}</option>)}
//         </select>
//         <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} />
//         <input name="image" placeholder="Image URL" value={formData.image} onChange={handleInputChange} />
//         <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleInputChange} />
//         <input name="date" type="datetime-local" value={formData.date} onChange={handleInputChange} />
//         <input name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} />
//         <button disabled={loading}>{loading ? "Creating..." : "Create Event"}</button>
//       </form>
//     </div>
//   );
// }

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent, verifyAdmin } from "./services/api";
import { ArrowLeft, Lock } from "lucide-react";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    description: "",
    image: "",
    price: "",
    date: "",
    location: "",
  });

  const cities = [
    "Ahmedabad","Bengaluru","Delhi","Jaipur","Mumbai","Vadodara","Surat",
    "Udaipur","Kolkata","Indore","Lucknow","Nagpur","Bhopal",
    "Visakhapatnam","Kochi","Coimbatore","Ludhiana","Ranchi",
    "Hyderabad","Goa","Chandigarh",
  ];

  const checkAdminAuthorization = useCallback(async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error();

      const res = await verifyAdmin();
      setIsAuthorized(res.data.isAdmin);
      if (!res.data.isAdmin) throw new Error();
    } catch {
      localStorage.clear();
      navigate("/admin-login");
    }
  }, [navigate]);

  useEffect(() => {
    checkAdminAuthorization();
  }, [checkAdminAuthorization]);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (Object.values(formData).some(v => !v)) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await createEvent({ ...formData, price: Number(formData.price) });
      setMessage("✅ Event created successfully!");
      setFormData({
        name: "", city: "", description: "", image: "",
        price: "", date: "", location: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthorized === null) {
    return <p style={{ color: "white", textAlign: "center" }}>Checking admin access...</p>;
  }

  if (!isAuthorized) {
    return (
      <div style={styles.centered}>
        <Lock size={40} />
        <p>Access Denied</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <button style={styles.backBtn} onClick={() => navigate("/home")}>
          <ArrowLeft size={18} /> Back
        </button>

        <h2 style={styles.title}>Add New Event</h2>

        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.success}>{message}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="name" placeholder="Event Name" value={formData.name} onChange={handleInputChange} style={styles.input} />

          <select name="city" value={formData.city} onChange={handleInputChange} style={styles.input}>
            <option value="">Select City</option>
            {cities.map(c => <option key={c}>{c}</option>)}
          </select>

          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} style={styles.textarea} />

          <input name="image" placeholder="Image URL" value={formData.image} onChange={handleInputChange} style={styles.input} />

          <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleInputChange} style={styles.input} />

          <input name="date" type="datetime-local" value={formData.date} onChange={handleInputChange} style={styles.input} />

          <input name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} style={styles.input} />

          <button disabled={loading} style={styles.submitBtn}>
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0A0A0A, #0e4231)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    color: "white",
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    background: "#1f1f1f",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  },
  backBtn: {
    background: "transparent",
    border: "none",
    color: "#aaa",
    cursor: "pointer",
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "grid",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #333",
    background: "#111",
    color: "white",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #333",
    background: "#111",
    color: "white",
    minHeight: "100px",
    resize: "vertical",
  },
  submitBtn: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#667eea",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  },
  error: {
    background: "#dc2626",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
  },
  success: {
    background: "#16a34a",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
  },
  centered: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
};
