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
      const email = localStorage.getItem("adminEmail");

      if (!token) {
        setIsAuthorized(false);
        navigate("/admin-login");
        return;
      }

      const res = await verifyAdmin();
      if (res.data.isAdmin) {
        setIsAuthorized(true);
      } else {
        throw new Error("Unauthorized");
      }
    } catch {
      localStorage.clear();
      setIsAuthorized(false);
      navigate("/admin-login");
    }
  }, [navigate]);

  useEffect(() => {
    checkAdminAuthorization();
  }, [checkAdminAuthorization]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      setMessage("Event created successfully!");
      setFormData({
        name: "", city: "", description: "", image: "",
        price: "", date: "", location: "",
      });
      setTimeout(() => navigate("/home"), 1500);
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
      <div style={{ textAlign: "center", color: "white" }}>
        <Lock size={40} />
        <p>Access Denied</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, color: "white" }}>
      <button onClick={() => navigate("/home")}><ArrowLeft /> Back</button>
      <h2>Add New Event</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Event Name" value={formData.name} onChange={handleInputChange} />
        <select name="city" value={formData.city} onChange={handleInputChange}>
          <option value="">Select City</option>
          {cities.map(c => <option key={c}>{c}</option>)}
        </select>
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} />
        <input name="image" placeholder="Image URL" value={formData.image} onChange={handleInputChange} />
        <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleInputChange} />
        <input name="date" type="datetime-local" value={formData.date} onChange={handleInputChange} />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} />
        <button disabled={loading}>{loading ? "Creating..." : "Create Event"}</button>
      </form>
    </div>
  );
}
