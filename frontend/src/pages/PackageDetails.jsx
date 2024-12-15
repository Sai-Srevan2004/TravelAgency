import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPackageById } from "../services/packageService";
import BookingForm from "../components/BookingForm";

const PackageDetails = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      const data = await getPackageById(id);
      setPkg(data);
    };
    fetchPackage();
  }, [id]);

  if (!pkg) return <p>Loading...</p>;
  console.log("ppppppp",pkg._id)

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img src={pkg.image} alt={pkg.title} className="rounded-lg" />
        <div>
          <h1 className="text-3xl font-bold">{pkg.title}</h1>
          <p>{pkg.description}</p>
          <p className="text-blue-600 font-bold">Price: ${pkg.price}</p>
          <BookingForm packageId={pkg._id} />
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
