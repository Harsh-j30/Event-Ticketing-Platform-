import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Landing from "./Landing";
import Home from "./Home";
import EventPage from "./EventPage";
import AdminPanel from "./AdminPanel";
import AdminLogin from "./AdminLogin";
import Events from "./Events";

function App() {
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
