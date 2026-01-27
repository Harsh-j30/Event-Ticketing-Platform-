import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { searchEvents } from "./services/api";
import AhmedabadImage from "./assets/images/Jamamasjid.jpg";
import BengaluruImage from "./assets/images/Bangalore.jpg";
//import ChandigarhImage from "./assets/images/Chandigarh.jpg";
import DelhiImage from "./assets/images/Lalkilala.jpg";
import VadodaraImage from "./assets/images/Lakshmivilas.jpg"; 
import MumbaiImage from "./assets/images/Indiagate.jpg";
//import HeydrabadImage from "./assets/images/Goa.jpg";
import JaipurImage from "./assets/images/Jaipur.jpg";
import UdaipurImage from "./assets/images/Udaipur.jpg";
import KolkataImage from "./assets/images/Kolkatta.jpg";
//import GoaImage from "./assets/images/Goa.jpg";
import SuratImage from "./assets/images/Surat.jpg";
//import LucknowImage from "./assets/images/Lukhnow.jpg";

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
      // If search by city name, redirect to event page
      navigate(`/events/${searchInput}`);
    } catch (error) {
      console.error("Search error:", error);
      // Still navigate to events page to show "No events found"
      navigate(`/events/${searchInput}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCityClick = (cityName) => {
    navigate(`/events/${cityName}`);
  };

  const popularCities = [
    { name: "Ahmedabad", image: AhmedabadImage },
    { name: "Bengaluru", image: BengaluruImage },
    { name: "Delhi", image: DelhiImage },
    { name: "Jaipur", image: JaipurImage },
    { name: "Mumbai", image: MumbaiImage },
    { name: "vadodara", image: VadodaraImage },
    { name: "Surat", image: SuratImage },
    { name: "Udaipur", image: UdaipurImage },
    { name: "Kolkata", image: KolkataImage },
    
  ];

  const otherCities = [
    "Indore", "Lucknow", "Nagpur", "Bhopal", "Visakhapatnam",
    "Kochi", "Coimbatore", "Vadodara", "Ludhiana", "Ranchi", "Hyderabad","Lucknow","Goa","Chandigarh"
  ];

  const styles = {
    container: {
      minHeight: "100vh",
      background:  "linear-gradient(135deg, #0A0A0A 10%, #0e4231 90%)",
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
      whiteSpace: "nowrap",
      transition: "background 0.3s",
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
  alignItems: "center",
  gap: "25px",
  flexWrap: "nowrap",     
},

    cityCard: {
      textAlign: "center",
      cursor: "pointer",
      transition: "transform 0.3s",
    },
  cityImage: {
  width: "120px",
  height: "120px",
  objectFit: "cover",
  borderRadius: "50%",   // <-- makes circle
  marginBottom: "10px",
  transition: "transform 0.3s",
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
  gridTemplateColumns: "repeat(5, 1fr)",   // 5 cities per row
  gap: "15px",
  maxWidth: "1000px",
  margin: "0 auto",
  padding: "0 20px",
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
  transition: "all 0.3s",
},
 footer: {
  marginTop: "40px",
  padding: "20px",
  background: "#111",
  color: "#ccc",
  textAlign: "center",
  fontSize: "14px",
  borderTop: "1px solid #222",
},

};
  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <span style={styles.navBrand}>Event Platform</span>
          <a style={styles.navLink} href="/home">Home</a>
          <a style={styles.navLink} href="/events-all">Events</a>
          <a style={styles.navLink} href="/admin-login">Admin</a>
        </div>
        <button
          style={styles.logoutBtn}
          onClick={handleLogout}
          onMouseEnter={(e) => e.target.style.background = "#b91c1c"}
          onMouseLeave={(e) => e.target.style.background = "#dc2626"}
        >
          Logout
        </button>
      </nav>

      {/* Search Section */}
      <div style={styles.searchSection}>
        <form style={styles.searchContainer} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search City or Event"
            style={styles.searchInput}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={(e) => e.target.style.background = "#3a3a3a"}
            onBlur={(e) => e.target.style.background = "#333"}
          />
          <button
            type="submit"
            style={{...styles.locationBtn, background: "#667eea"}}
            disabled={loading}
            onMouseEnter={(e) => !loading && (e.target.style.background = "#5568d3")}
            onMouseLeave={(e) => !loading && (e.target.style.background = "#667eea")}
          >
            <Search size={20} />
            {loading ? "Searching..." : "Search"}
          </button>
          <button
            type="button"
            style={styles.locationBtn}
            onMouseEnter={(e) => e.target.style.background = "#7f1d1d"}
            onMouseLeave={(e) => e.target.style.background = "#991b1b"}
          >
            <MapPin size={20} />
            Use current location
          </button>
        </form>
      </div>
    

      {/* Popular Cities */}
      <h2 style={styles.sectionTitle}>Popular Cities</h2>
      <div style={styles.citiesGrid}>
        {popularCities.map((city, index) => (
          <div
            key={index}
            style={styles.cityCard}
            onClick={() => handleCityClick(city.name)}
            onMouseEnter={(e) => {
              e.currentTarget.querySelector("img").style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector("img").style.transform = "scale(1)";
            }}
          >
            <img src={city.image} alt={city.name} style={styles.cityImage} />
            <p style={styles.cityName}>{city.name}</p>
          </div>
        ))}
      </div>

      {/* Other Cities */}

 <h2 style={styles.sectionTitle}>Other Cities</h2>

<div style={styles.otherCitiesGrid}>
  {otherCities.map((city, index) => (
    <div
      key={index}
      style={styles.cityTag}
      onClick={() => handleCityClick(city)}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#333";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#1f1f1f";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {city}
    </div>
  ))}
</div>


      {/* Footer */}
      <footer style={styles.footer}>
             © 2026 Event Platform | All Rights Reserved
     </footer>

    </div>
  );
}
