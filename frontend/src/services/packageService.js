const API_URL = import.meta.env.VITE_API_URL;  // The base URL for your backend API
import axios from 'axios'

// Fetch all available tour packages
export const getPackages = async () => {
  try {
    const response = await axios.get("http://localhost:2000/api/packages");
    console.log("re:",response.data)
    if (!response.data.success) {
      throw new Error("Failed to fetch packages");
    }
    return await response.data.data; // Return the list of packages
  } catch (error) {
    console.error("Error fetching packages:", error);
    console.log(error.message)
    return []; // Return an empty array if an error occurs
  }
};

// Fetch a specific package by its ID
export const getPackageById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:2000/api/packages/${id}`);
    console.log(response,"....")
    if (!response.data.success) {
      throw new Error("Failed to fetch package details");
    }
    return await response.data.data; // Return the package details
  } catch (error) {
    console.error("Error fetching package details:", error);
    return null; // Return null if an error occurs
  }
};

// Add a new package (POST)
export const addPackage = async (packageData) => {
  console.log(packageData,"pack")
  try {
    const response = await axios.post(`http://localhost:2000/api/packages/`, {packageData},{ 
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.data.success) {
      throw new Error('Failed to add package');
    }

    return await response.data.data; // Return the newly created package data
  } catch (error) {
    console.error('Error adding package:', error);
    throw error;
  }
};

// Update an existing package (PUT)
export const updatePackage = async (id, packageData) => {
  try {
    const response = await axios.put(
      `http://localhost:2000/api/packages/${id}`, 
      { packageData },
      { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    

    if (!response.data.success) {
      throw new Error('Failed to update package');
    }

    return await response.data.data; // Return the updated package data
  } catch (error) {
    console.error('Error updating package:', error);
    throw error;
  }
};

// Delete a package (DELETE)
export const deletePackage = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:2000/api/packages/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.data.success) {
      throw new Error('Failed to delete package');
    }

    return await response.data.data; // Return a success message
  } catch (error) {
    console.error('Error deleting package:', error);
    throw error;
  }
};
