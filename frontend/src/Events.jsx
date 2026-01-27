import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Ticket, Search } from "lucide-react";
import { getAllEvents } from "./services/api";

export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [cities, setCities] = useState(["All"]);

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      setLoading(true);
      const response = await getAllEvents();
      const eventsData = response.data.events;
      setEvents(eventsData);
      setFilteredEvents(eventsData);

      // Extract unique cities
      const uniqueCities = ["All", ...new Set(eventsData.map((event) => event.city))];
      setCities(uniqueCities.sort());
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load events");
      setEvents([]);
      setFilteredEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterEvents(query, selectedCity);
  };

  const handleCityFilter = (city) => {
    setSelectedCity(city);
    filterEvents(searchQuery, city);
  };

  const filterEvents = (query, city) => {
    let filtered = events;

    // Filter by city
    if (city !== "All") {
      filtered = filtered.filter((event) => event.city === city);
    }

    // Filter by search query
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.name.toLowerCase().includes(lowerQuery) ||
          event.city.toLowerCase().includes(lowerQuery) ||
          event.description.toLowerCase().includes(lowerQuery)
      );
    }

    setFilteredEvents(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "#1a1a1a",
      color: "white",
    },
    navbar: {
      padding: "15px 20px",
      background: "#282c34",
      color: "white",
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
      transition: "opacity 0.3s",
    },
    logoutBtn: {
      background: "#dc2626",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "background 0.3s",
    },
    header: {
      padding: "30px 20px",
      textAlign: "center",
      background:  "linear-gradient(135deg, #0A0A0A 10%, #0e4231 90%)",
      borderBottom: "2px solid #2b6943",
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
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "30px 20px",
    },
    searchSection: {
      marginBottom: "30px",
    },
    searchContainer: {
      display: "flex",
      gap: "15px",
      marginBottom: "20px",
    },
    searchInput: {
      flex: 1,
      padding: "12px 20px",
      borderRadius: "8px",
      border: "2px solid #444",
      background: "#2a2a2a",
      color: "white",
      fontSize: "16px",
      transition: "border-color 0.3s",
    },
    filterSection: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      marginBottom: "20px",
    },
    filterTag: {
      padding: "8px 15px",
      background: "#2a2a2a",
      border: "2px solid #444",
      borderRadius: "25px",
      cursor: "pointer",
      transition: "all 0.3s",
      fontSize: "14px",
      fontWeight: "600",
    },
    filterTagActive: {
      background: "#2e6d48",
      borderColor: "#377e52",
      color: "white",
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
      transition: "transform 0.3s, box-shadow 0.3s",
      cursor: "pointer",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
    },
    eventImage: {
      width: "100%",
      height: "250px",
      objectFit: "cover",
      background: "#1a1a1a",
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
    eventCity: {
      fontSize: "12px",
      background: "#667eea",
      color: "white",
      padding: "4px 10px",
      borderRadius: "20px",
      display: "inline-block",
      marginBottom: "10px",
      fontWeight: "600",
    },
    eventDescription: {
      fontSize: "14px",
      color: "#ccc",
      marginBottom: "15px",
      lineHeight: "1.6",
      maxHeight: "60px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    eventDetails: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginBottom: "15px",
      fontSize: "14px",
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
      transition: "background 0.3s",
    },
    emptyState: {
      textAlign: "center",
      padding: "60px 20px",
    },
    emptyTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    emptyMessage: {
      fontSize: "16px",
      color: "#aaa",
      marginBottom: "30px",
    },
    errorMessage: {
      background: "#dc2626",
      color: "white",
      padding: "15px 20px",
      borderRadius: "8px",
      marginBottom: "20px",
      textAlign: "center",
    },
    loadingSpinner: {
      textAlign: "center",
      padding: "60px 20px",
      fontSize: "18px",
      color: "#aaa",
    },
    statsBar: {
      background: "#2a2a2a",
      padding: "15px 20px",
      borderRadius: "8px",
      marginBottom: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "20px",
    },
    statItem: {
      fontSize: "14px",
      color: "#aaa",
    },
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <span style={styles.navBrand}>Event Platform</span>
          <a style={styles.navLink} href="/home">
            Home
          </a>
          <a style={styles.navLink} href="/events-all">
            Events
          </a>
          <a style={styles.navLink} href="/admin-login">
            Admin
          </a>
        </div>
        <button
          style={styles.logoutBtn}
          onClick={handleLogout}
          onMouseEnter={(e) => (e.target.style.background = "#b91c1c")}
          onMouseLeave={(e) => (e.target.style.background = "#dc2626")}
        >
          Logout
        </button>
      </nav>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>All Events</h1>
        <p style={styles.subtitle}>Explore all amazing events from across the country</p>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {error && <div style={styles.errorMessage}>{error}</div>}

        {loading ? (
          <div style={styles.loadingSpinner}>Loading events...</div>
        ) : (
          <>
            {/* Search Section */}
            <div style={styles.searchSection}>
              <div style={styles.searchContainer}>
                <input
                  type="text"
                  placeholder="Search events by name, city, or description..."
                  style={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                  onBlur={(e) => (e.target.style.borderColor = "#444")}
                />
                <button
                  style={{
                    ...styles.bookBtn,
                    padding: "12px 30px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#5568d3")}
                  onMouseLeave={(e) => (e.target.style.background = "#667eea")}
                >
                  <Search size={18} />
                  Search
                </button>
              </div>

              {/* City Filter */}
              <div style={styles.filterSection}>
                {cities.map((city) => (
                  <button
                    key={city}
                    style={{
                      ...styles.filterTag,
                      ...(selectedCity === city && styles.filterTagActive),
                    }}
                    onClick={() => handleCityFilter(city)}
                    onMouseEnter={(e) => {
                      if (selectedCity !== city) {
                        e.target.style.borderColor = "#667eea";
                        e.target.style.color = "#667eea";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCity !== city) {
                        e.target.style.borderColor = "#444";
                        e.target.style.color = "white";
                      }
                    }}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Bar */}
            {filteredEvents.length > 0 && (
              <div style={styles.statsBar}>
                <span style={styles.statItem}>
                  Showing <strong>{filteredEvents.length}</strong> event
                  {filteredEvents.length !== 1 ? "s" : ""}
                </span>
                {selectedCity !== "All" && (
                  <span style={styles.statItem}>in <strong>{selectedCity}</strong></span>
                )}
              </div>
            )}

            {/* Events Grid */}
            {filteredEvents.length === 0 ? (
              <div style={styles.emptyState}>
                <h2 style={styles.emptyTitle}>No Events Found</h2>
                <p style={styles.emptyMessage}>
                  {searchQuery || selectedCity !== "All"
                    ? "Try adjusting your search or filter criteria"
                    : "No events available at the moment"}
                </p>
                <button
                  style={{
                    ...styles.bookBtn,
                    padding: "12px 30px",
                    fontSize: "16px",
                  }}
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCity("All");
                    filterEvents("", "All");
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#5568d3")}
                  onMouseLeave={(e) => (e.target.style.background = "#667eea")}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div style={styles.eventsGrid}>
                {filteredEvents.map((event) => (
                  <div
                    key={event._id}
                    style={styles.eventCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
                    }}
                  >
                    <img
                      src={event.image}
                      alt={event.name}
                      style={styles.eventImage}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/350x250?text=Event+Image";
                      }}
                    />
                    <div style={styles.eventInfo}>
                      <div style={styles.eventCity}>{event.city}</div>
                      <h3 style={styles.eventName}>{event.name}</h3>
                      <p style={styles.eventDescription}>{event.description}</p>

                      <div style={styles.eventDetails}>
                        <div style={styles.detailItem}>
                          <MapPin size={16} />
                          {event.location}
                        </div>
                        <div style={styles.detailItem}>
                          <Calendar size={16} />
                          {new Date(event.date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>

                      <div style={styles.priceSection}>
                        <div style={styles.price}>₹{event.price}</div>
                        <button
                          style={styles.bookBtn}
                          onMouseEnter={(e) => (e.target.style.background = "#5568d3")}
                          onMouseLeave={(e) => (e.target.style.background = "#667eea")}
                        >
                          <Ticket size={16} style={{ marginRight: "5px" }} />
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
