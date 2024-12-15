import { useState, useEffect } from "react";
import { getPackages } from "../services/packageService";
import PackageCard from "../components/PackageCard";

const Home = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const data = await getPackages();
      setPackages(data);  // Store the fetched packages in state
    };
    fetchPackages();  // Call the API to fetch packages
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Available Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <PackageCard key={pkg._id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
};

export default Home;
