import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import Button from "../../components/common/Button";
import NotesList from "../../components/notes/NotesList";
import TaskList from "../../components/tasks/TaskList";
import { getLeadById } from "../../services/leadService";
import { convertLeadToContact } from "../../services/contactService";
import toast from "react-hot-toast";

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState(false);

  useEffect(() => {
    fetchLead();
  }, [id]);

  const fetchLead = async () => {
    try {
      setLoading(true);

      const response = await getLeadById(id);

      console.log("Lead Response:", response);

      // response = { success:true, data:{...} }
      setLead(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load lead.");
    } finally {
      setLoading(false);
    }
  };

  const handleConvert = async () => {
    try {
      setConverting(true);

      await convertLeadToContact(id);

      toast.success("Lead converted successfully.");

      // Refresh lead
      await fetchLead();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to convert lead."
      );
    } finally {
      setConverting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  if (!lead) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center">
          Lead not found.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="flex justify-between items-start">

        <div>
          <Link
            to="/leads"
            className="text-blue-600 hover:underline"
          >
            ← Back to Leads
          </Link>

          <h1 className="text-3xl font-bold mt-3">
            {lead.firstName} {lead.lastName}
          </h1>
        </div>

        {lead.isConverted && lead.convertedContact ? (
          <Button
            className="w-auto px-6 bg-green-600 hover:bg-green-700"
            onClick={() =>
              navigate(`/contacts/${lead.convertedContact._id}`)
            }
          >
            View Contact
          </Button>
        ) : (
          <Button
            onClick={handleConvert}
            disabled={converting}
            className="w-auto px-6"
          >
            {converting
              ? "Converting..."
              : "Convert to Contact"}
          </Button>
        )}

      </div>

      <div className="bg-white rounded-xl shadow p-6 mt-6">

        <h2 className="text-xl font-semibold mb-6">
          Lead Information
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <p className="text-gray-500">First Name</p>
            <p>{lead.firstName}</p>
          </div>

          <div>
            <p className="text-gray-500">Last Name</p>
            <p>{lead.lastName || "-"}</p>
          </div>

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
            <p>{lead.leadSource || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">Lifecycle Stage</p>
            <p>{lead.lifecycleStage || "-"}</p>
          </div>

        </div>

      </div>

      <div className="mt-8">
        <NotesList />
      </div>

      <div className="mt-8">
        <TaskList />
      </div>

    </DashboardLayout>
  );
};

export default LeadDetails;