import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Landing from "./Landing";
import Home from "./Home";
import EventPage from "./EventPage";
import AdminPanel from "./AdminPanel";
import AdminLogin from "./AdminLogin";
import Events from "./Events";

function App() {
  const styles = {
    header: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      padding: "20px",
      textAlign: "center",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    title: {
      margin: "0",
      fontSize: "32px",
      fontWeight: "bold",
    },
    nav: {
      display: "flex",
      justifyContent: "center",
      gap: "30px",
      marginTop: "20px",
      borderTop: "2px solid rgba(255, 255, 255, 0.2)",
      paddingTop: "20px",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: "600",
      transition: "opacity 0.3s ease",
      padding: "8px 16px",
      borderRadius: "5px",
    },
    linkHover: {
      opacity: "0.8",
      background: "rgba(255, 255, 255, 0.1)",
    },
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events-all" element={<Events />} />
        <Route path="/events/:city" element={<EventPage />} />
        <Route path="/admin/add-event" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
