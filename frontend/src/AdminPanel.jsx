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
          <ArrowLeft size={20} /> Back
        </button>

        <h2 style={styles.title}>Add New Event</h2>

        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.success}>{message}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputContainer}>
            <input 
              name="name" 
              placeholder="Event Name" 
              value={formData.name} 
              onChange={handleInputChange} 
              style={styles.input}
            />
          </div>

          <div style={styles.inputContainer}>
            <select 
              name="city" 
              value={formData.city} 
              onChange={handleInputChange} 
              style={styles.inputSelect}
            >
              <option value="">Select City</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div style={styles.inputContainer}>
            <textarea 
              name="description" 
              placeholder="Description" 
              value={formData.description} 
              onChange={handleInputChange} 
              style={{...styles.textarea, padding: "12px"}}
            />
          </div>

          <div style={styles.inputContainer}>
            <input 
              name="image" 
              placeholder="Image URL" 
              value={formData.image} 
              onChange={handleInputChange} 
              style={styles.input}
            />
          </div>

          <div style={styles.inputContainer}>
            <input 
              name="price" 
              type="number" 
              placeholder="Ticket Price (₹)" 
              value={formData.price} 
              onChange={handleInputChange} 
              style={styles.input}
            />
          </div>

          <div style={styles.inputContainer}>
            <input 
              name="date" 
              type="datetime-local" 
              value={formData.date} 
              onChange={handleInputChange} 
              style={styles.input}
            />
          </div>

          <div style={styles.inputContainer}>
            <input 
              name="location" 
              placeholder="Location/Venue" 
              value={formData.location} 
              onChange={handleInputChange} 
              style={styles.input}
            />
          </div>

          <button 
            disabled={loading} 
            style={{
              ...styles.submitBtn,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
            onMouseEnter={(e) => !loading && (e.target.style.background = "#0d3a28")}
            onMouseLeave={(e) => !loading && (e.target.style.background = "#0e4231")}
          >
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
    background: "linear-gradient(135deg, #0A0A0A 10%, #0e4231 90%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    color: "white",
  },
  card: {
    width: "100%",
    maxWidth: "550px",
    background: "rgba(10,10,10,0.9)",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.7)",
  },
  backBtn: {
    background: "transparent",
    border: "none",
    color: "#3df83d",
    cursor: "pointer",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "18px",
    fontWeight: "550",
    transition: "color 0.3s ease",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "28px",
    fontWeight: "700",
    color: "white",
  },
  form: {
    display: "grid",
    gap: "18px",
  },

 inputContainer: {
  display: "flex",
  alignItems: "center",
  background: "black", 
  borderRadius: "8px",
  padding: "12px",
  border: "none",
},

input: {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "6px",
  border: "none",
  outline: "none",
  fontSize: "14px",
  color: "white",          
  background: "transparent", 
},

  inputSelect: {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "6px",
  border: "none",
  outline: "none",
  fontSize: "14px",
  color: "#493f3f",
  background: "transparent", 
},

  textarea: {
  width: "100%",
  padding: "12px",
  borderRadius: "6px",
  border: "none",
  outline: "none",
  fontSize: "14px",
  color: "white",
  background: "transparent",
  minHeight: "100px",
  resize: "vertical",
  fontFamily: "inherit",
},

  submitBtn: {
    marginTop: "15px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#0e4231",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s ease, transform 0.2s ease",
  },
  error: {
    background: "#dc2626",
    padding: "12px",
    borderRadius: "8px",
    textAlign: "center",
    marginBottom: "15px",
    fontSize: "14px",
    fontWeight: "500",
  },
  success: {
    background: "#16a34a",
    padding: "12px",
    borderRadius: "8px",
    textAlign: "center",
    marginBottom: "15px",
    fontSize: "14px",
    fontWeight: "500",
  },
  centered: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    background: "linear-gradient(135deg, #0A0A0A 10%, #0e4231 90%)",
  },
};
