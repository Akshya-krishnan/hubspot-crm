import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getContactById } from "../../services/contactService";

const ContactDetails = () => {
  const { id } = useParams();

  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const response = await getContactById(id);
      setContact(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load contact");
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

  if (!contact) {
    return (
      <DashboardLayout>
        <p>Contact not found.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Contact Details
      </h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">

        <div>
          <strong>Name:</strong>{" "}
          {contact.firstName} {contact.lastName}
        </div>

        <div>
          <strong>Email:</strong>{" "}
          {contact.email}
        </div>

        <div>
          <strong>Phone:</strong>{" "}
          {contact.phone || "-"}
        </div>

        <div>
          <strong>Company:</strong>{" "}
          {contact.company || "-"}
        </div>

        <div>
          <strong>Lead Source:</strong>{" "}
          {contact.leadSource || "-"}
        </div>

        <div>
          <strong>Lifecycle Stage:</strong>{" "}
          {contact.lifecycleStage || "-"}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default ContactDetails;