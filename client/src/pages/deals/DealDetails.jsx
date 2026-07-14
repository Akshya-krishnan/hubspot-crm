import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getDealById } from "../../services/dealService";

const DealDetails = () => {
  const { id } = useParams();

  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeal();
  }, []);

  const fetchDeal = async () => {
    try {
      const response = await getDealById(id);
      setDeal(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  if (!deal) {
    return (
      <DashboardLayout>
        <p>Deal not found.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Link
        to="/deals"
        className="text-blue-600 hover:underline"
      >
        ← Back to Deals
      </Link>

      <h1 className="text-3xl font-bold mt-4">
        {deal.dealName}
      </h1>

      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">
          Deal Information
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <p className="text-gray-500">Deal Name</p>
            <p>{deal.dealName}</p>
          </div>

          <div>
            <p className="text-gray-500">Amount</p>
            <p>₹{Number(deal.amount).toLocaleString()}</p>
          </div>

          <div>
            <p className="text-gray-500">Company</p>
            <p>{deal.company || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">Contact</p>
            <p>{deal.contact || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">Stage</p>
            <p>{deal.stage}</p>
          </div>

          <div>
            <p className="text-gray-500">Close Date</p>
            <p>
              {deal.closeDate
                ? new Date(deal.closeDate).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-gray-500">Description</p>
            <p>{deal.description || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">Created At</p>
            <p>
              {new Date(deal.createdAt).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Updated At</p>
            <p>
              {new Date(deal.updatedAt).toLocaleString()}
            </p>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default DealDetails;