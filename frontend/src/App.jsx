import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PackageDetails from "./pages/PackageDetails";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/package/:id" element={<PackageDetails />} />
        <Route path="/admin" element={<AdminPage />} />  {/* Admin panel page */}

      </Routes>
    </Router>
  );
}

export default App;
