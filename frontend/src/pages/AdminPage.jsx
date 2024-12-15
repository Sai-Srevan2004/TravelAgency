import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPanel from "../components/AdminPanel";

const AdminPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if the user is an admin (e.g., check localStorage or authentication status)
    const isAdmin = localStorage.getItem("token");
    if (!isAdmin) {
      navigate("/"); // Redirect to home if not an admin
    } else {
      setIsAdmin(true); // Otherwise, set admin state to true
    }
  }, [navigate]);

  return isAdmin ? (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <AdminPanel />
    </div>
  ) : (
    <p>Redirecting...</p> // Show loading message or redirecting status
  );
};

export default AdminPage;
