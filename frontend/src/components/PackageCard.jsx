import { Link } from "react-router-dom";

const PackageCard = ({ pkg, onDelete, onEdit, onBookNow }) => {
  // Check if the user is an admin (for example, via localStorage)
  const isAdmin = localStorage.getItem('token'); // Assuming isAdmin is stored in localStorage

  return (
    <div className="border p-4 rounded-md">
      <h2 className="text-xl font-semibold">{pkg.title}</h2>
      <p>{pkg.description}</p>
      <p className="text-blue-600">Price: ${pkg.price}</p>
      
      <div className="flex justify-between mt-4">
        {/* If the user is an admin, show Edit and Delete buttons */}
        {isAdmin && (
          <>
            <button onClick={onEdit} className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Edit
            </button>
            <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded-md">
              Delete
            </button>
          </>
        )}

        {/* If the user is authenticated (normal user), show Book Now button */}
        {!isAdmin && (
          (
            <Link to={`/package/${pkg._id}`} className="bg-blue-600 text-white px-4 py-2 mt-4 inline-block rounded">
          View Details
        </Link>
          )
        )}
      </div>
    </div>
  );
};

export default PackageCard;
