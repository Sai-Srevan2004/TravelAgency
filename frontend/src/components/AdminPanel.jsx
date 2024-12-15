import { useState, useEffect } from "react";
import { getPackages, deletePackage } from "../services/packageService";
import PackageCard from "./PackageCard"; // Displays individual package cards
import PackageForm from "./PackageForm"; // Form for adding/updating packages

const AdminPanel = () => {
  const [packages, setPackages] = useState([]);  // State to hold all packages
  const [isFormOpen, setIsFormOpen] = useState(false);  // To toggle form visibility
  const [selectedPackage, setSelectedPackage] = useState(null);  // To store selected package for editing

  useEffect(() => {
    // Fetch packages from API when the component mounts
    const fetchPackages = async () => {
      try {
        const data = await getPackages();
        setPackages(data);  // Store the fetched packages in state
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  // Delete a package by ID
  const handleDeletePackage = async (id) => {
    try {
      await deletePackage(id); // Call the API to delete the package
      setPackages(packages.filter((pkg) => pkg._id !== id));  // Remove deleted package from the state
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  // Edit a package, open the form with the selected package's details
  const handleEditPackage = (pkg) => {
    setSelectedPackage(pkg);  // Set the selected package to edit
    setIsFormOpen(true);  // Open the form for editing
  };

  // Open the form for adding a new package
  const handleAddPackage = () => {
    setSelectedPackage(null);  // Clear selected package
    setIsFormOpen(true);  // Open the form for adding a new package
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <button
        onClick={handleAddPackage}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Add New Package
      </button>

      <div className="space-y-4">
        {packages.map((pkg) => (
          <PackageCard
            key={pkg._id}
            pkg={pkg}
            onDelete={() => handleDeletePackage(pkg._id)}  // Handle delete
            onEdit={() => handleEditPackage(pkg)}  // Handle edit
          />
        ))}
      </div>

      {/* Package Form Modal */}
      {isFormOpen && (
        <PackageForm
          packageData={selectedPackage}  // Pass selected package for editing or null for new package
          onClose={() => setIsFormOpen(false)}  // Close the form
          onUpdatePackage={(pkg) => {
            // Update the package in the list after successful creation or edit
            setPackages(
              selectedPackage
                ? packages.map((p) => (p._id === pkg._id ? pkg : p))  // Edit existing package
                : [...packages, pkg]  // Add new package
            );
            setIsFormOpen(false);  // Close the form
          }}
        />
      )}
    </div>
  );
};

export default AdminPanel;
