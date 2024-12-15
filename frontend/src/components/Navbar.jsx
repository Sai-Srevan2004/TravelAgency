import { Link } from "react-router-dom";

const Navbar = () => {
  // Check if the user is logged in and has an "admin" role
  const isAdmin = localStorage.getItem("token"); // Assuming the admin status is stored in localStorage

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Travel Agency</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white">Home</Link>
          {isAdmin && (
            <Link to="/admin" className="text-white">Admin Panel</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
