import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Calendar, Ticket } from "lucide-react";
import { getEventsByCity } from "./services/api";

export default function EventPage() {
  const { city } = useParams();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEventsByCity = async () => {
      try {
        setLoading(true);
        const response = await getEventsByCity(city);
        setEvents(response.data.events);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load events");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsByCity();
  }, [city]);

  const styles = {
    container: {
      minHeight: "100vh",
      background: "#1a1a1a",
      color: "white",
    },
    navbar: {
      padding: "15px 20px",
      background: "#282c34",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    navLeft: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
    },
    navBrand: {
      fontWeight: "bold",
      fontSize: "18px",
    },
    navLink: {
      color: "white",
      textDecoration: "none",
      cursor: "pointer",
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
    },
    header: {
      padding: "30px 20px",
      textAlign: "center",
      background: "linear-gradient(135deg, #0A0A0A 10%, #0e4231 90%)",
      borderBottom: "2px solid #2b755c",
    },
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "16px",
      opacity: "0.9",
    },
    content: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "30px 20px",
    },
    eventsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
      gap: "30px",
      marginTop: "20px",
    },
    eventCard: {
      background: "#2a2a2a",
      borderRadius: "12px",
      overflow: "hidden",
      cursor: "pointer",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
      transition: "transform 0.3s, box-shadow 0.3s",
    },
    eventImage: {
      width: "100%",
      height: "250px",
      objectFit: "cover",
    },
    eventInfo: {
      padding: "20px",
    },
    eventName: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "12px",
      color: "#667eea",
    },
    eventDescription: {
      fontSize: "14px",
      color: "#ccc",
      marginBottom: "15px",
      lineHeight: "1.6",
      maxHeight: "60px",
      overflow: "hidden",
    },
    eventDetails: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginBottom: "15px",
    },
    detailItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#bbb",
    },
    priceSection: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: "15px",
      borderTop: "1px solid #444",
    },
    price: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#667eea",
    },
    bookBtn: {
      background: "#667eea",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
    },
    emptyState: {
      textAlign: "center",
      padding: "60px 20px",
    },
    errorMessage: {
      background: "#dc2626",
      color: "white",
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "20px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <button style={styles.backBtn} onClick={() => navigate("/home")}>
            <ArrowLeft size={20} /> Back
          </button>
          <span style={styles.navBrand}>Event Platform</span>
          <a style={styles.navLink} href="/events-all">Events</a>
          <a style={styles.navLink} href="/admin-login">Admin</a>
        </div>
      </nav>

      <div style={styles.header}>
        <h1 style={styles.title}>Events in {city}</h1>
        <p style={styles.subtitle}>Discover amazing events near you</p>
      </div>

      <div style={styles.content}>
        {error && <div style={styles.errorMessage}>{error}</div>}

        {loading ? (
          <div style={{ textAlign: "center" }}>Loading events...</div>
        ) : events.length === 0 ? (
          <div style={styles.emptyState}>
            <h2>No Events Found</h2>
            <p>No events available in {city}</p>
            <button style={styles.bookBtn} onClick={() => navigate("/home")}>
              Back to Home
            </button>
          </div>
        ) : (
          <div style={styles.eventsGrid}>
            {events.map((event) => (
              <div key={event._id} style={styles.eventCard}>
                <img
                  src={event.image}
                  alt={event.name}
                  style={styles.eventImage}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/350x250?text=Event+Image";
                  }}
                />

                <div style={styles.eventInfo}>
                  <h3 style={styles.eventName}>{event.name}</h3>
                  <p style={styles.eventDescription}>{event.description}</p>

                  <div style={styles.eventDetails}>
                    <div style={styles.detailItem}>
                      <MapPin size={16} /> {event.location}
                    </div>
                    <div style={styles.detailItem}>
                      <Calendar size={16} />
                      {new Date(event.date).toLocaleDateString("en-IN")}
                    </div>
                  </div>

                  <div style={styles.priceSection}>
                    <div style={styles.price}>₹{event.price}</div>
                    <button style={styles.bookBtn}>
                      <Ticket size={16} /> Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
