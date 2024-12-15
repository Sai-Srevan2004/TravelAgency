import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PackageCard from '../components/PackageCard';

const Home = () => {
  const [packages, setPackages] = useState([]);
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      const res = await axios.get('http://localhost:2000/api/packages');
      setPackages(res.data.data);
      setLoading(false)
    };
    fetchPackages();
  }, []);

  if(loading)
  {
    return <p>Loading...</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Available Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <PackageCard key={pkg._id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
};

export default Home;
