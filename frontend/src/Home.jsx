import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { searchEvents } from "./services/api";

import AhmedabadImage from "./assets/images/Jamamasjid.jpg";
import BengaluruImage from "./assets/images/Bangalore.jpg";
import DelhiImage from "./assets/images/Lalkilala.jpg";
import VadodaraImage from "./assets/images/Lakshmivilas.jpg";
import MumbaiImage from "./assets/images/Indiagate.jpg";
import JaipurImage from "./assets/images/Jaipur.jpg";
import UdaipurImage from "./assets/images/Udaipur.jpg";
import KolkataImage from "./assets/images/Kolkatta.jpg";
import SuratImage from "./assets/images/Surat.jpg";

export default function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    try {
      setLoading(true);
      await searchEvents(searchInput);
      navigate(`/events/${searchInput}`);
    } catch (error) {
      console.error("Search error:", error);
      navigate(`/events/${searchInput}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCityClick = (city) => {
    navigate(`/events/${city}`);
  };

  const popularCities = [
    { name: "Ahmedabad", image: AhmedabadImage },
    { name: "Bengaluru", image: BengaluruImage },
    { name: "Delhi", image: DelhiImage },
    { name: "Jaipur", image: JaipurImage },
    { name: "Mumbai", image: MumbaiImage },
    { name: "Vadodara", image: VadodaraImage },
    { name: "Surat", image: SuratImage },
    { name: "Udaipur", image: UdaipurImage },
    { name: "Kolkata", image: KolkataImage },
  ];

  const otherCities = [
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

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0A0A0A 10%, #0e4231 90%)",
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
    logoutBtn: {
      background: "#dc2626",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "600",
    },
    searchSection: {
      padding: "40px 20px",
      textAlign: "center",
    },
    searchContainer: {
      maxWidth: "600px",
      margin: "0 auto 30px",
      display: "flex",
      gap: "15px",
    },
    searchInput: {
      flex: 1,
      padding: "12px 20px",
      borderRadius: "30px",
      border: "none",
      background: "#333",
      color: "white",
      fontSize: "16px",
    },
    locationBtn: {
      background: "#991b1b",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "30px",
      cursor: "pointer",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    sectionTitle: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "30px",
      textAlign: "center",
    },
    citiesGrid: {
      display: "flex",
      justifyContent: "center",
      gap: "25px",
      flexWrap: "nowrap",
    },
    cityCard: {
      textAlign: "center",
      cursor: "pointer",
    },
    cityImage: {
      width: "120px",
      height: "120px",
      objectFit: "cover",
      borderRadius: "50%",
      marginBottom: "10px",
      transition: "transform 0.3s",
    },
    cityName: {
      fontSize: "14px",
      fontWeight: "600",
    },
    otherCitiesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: "15px",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    cityTag: {
      padding: "10px 12px",
      background: "#1f1f1f",
      borderRadius: "12px",
      textAlign: "center",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      border: "1px solid #333",
    },
    footer: {
      marginTop: "40px",
      padding: "20px",
      background: "#111",
      color: "#ccc",
      textAlign: "center",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <span style={styles.navBrand}>Event Platform</span>
          <a style={styles.navLink} href="/home">Home</a>
          <a style={styles.navLink} href="/events-all">Events</a>
          <a style={styles.navLink} href="/admin-login">Admin</a>
        </div>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div style={styles.searchSection}>
        <form style={styles.searchContainer} onSubmit={handleSearch}>
          <input
            style={styles.searchInput}
            placeholder="Search City or Event"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.locationBtn, background: "#667eea" }}
          >
            <Search size={18} />
            {loading ? "Searching..." : "Search"}
          </button>
          <button type="button" style={styles.locationBtn}>
            <MapPin size={18} />
            Use location
          </button>
        </form>
      </div>

      <h2 style={styles.sectionTitle}>Popular Cities</h2>
      <div style={styles.citiesGrid}>
        {popularCities.map((city) => (
          <div
            key={city.name}
            style={styles.cityCard}
            onClick={() => handleCityClick(city.name)}
          >
            <img src={city.image} alt={city.name} style={styles.cityImage} />
            <p style={styles.cityName}>{city.name}</p>
          </div>
        ))}
      </div>

      <h2 style={styles.sectionTitle}>Other Cities</h2>
      <div style={styles.otherCitiesGrid}>
        {otherCities.map((city) => (
          <div
            key={city}
            style={styles.cityTag}
            onClick={() => handleCityClick(city)}
          >
            {city}
          </div>
        ))}
      </div>

      <footer style={styles.footer}>
        © 2026 Event Platform | All Rights Reserved
      </footer>
    </div>
  );
}
