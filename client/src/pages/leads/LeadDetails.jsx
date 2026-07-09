import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getLeadById } from "../../services/leadService";

const LeadDetails = () => {
  const { id } = useParams();

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLead();
  }, []);

  const fetchLead = async () => {
    try {
      const response = await getLeadById(id);
      setLead(response.data);
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

  if (!lead) {
    return (
      <DashboardLayout>
        <p>Lead not found.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Link
        to="/leads"
        className="text-blue-600 hover:underline"
      >
        ← Back to Leads
      </Link>

      <h1 className="text-3xl font-bold mt-4">
        {lead.firstName} {lead.lastName}
      </h1>

      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">
          Lead Information
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <p className="text-gray-500">Email</p>
            <p>{lead.email}</p>
          </div>

          <div>
            <p className="text-gray-500">Phone</p>
            <p>{lead.phone || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">Company</p>
            <p>{lead.company || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">Lead Source</p>
            <p>{lead.leadSource}</p>
          </div>

          <div>
            <p className="text-gray-500">Lifecycle Stage</p>
            <p>{lead.lifecycleStage}</p>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default LeadDetails;