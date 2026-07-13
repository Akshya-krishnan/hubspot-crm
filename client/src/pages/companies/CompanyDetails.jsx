import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getCompanyById,
  getCompanyContacts,
  getCompanyLeads,
} from "../../services/companyService";

const CompanyDetails = () => {
  const { id } = useParams();

  const [company, setCompany] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanyData();
  }, [id]);

  const fetchCompanyData = async () => {
    try {
      setLoading(true);

      const companyRes = await getCompanyById(id);
      const contactsRes = await getCompanyContacts(id);
      const leadsRes = await getCompanyLeads(id);

      setCompany(companyRes.data);
      setContacts(contactsRes.data);
      setLeads(leadsRes.data);

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

  if (!company) {
    return (
      <DashboardLayout>
        <p>Company not found.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Link
        to="/companies"
        className="text-blue-600 hover:underline"
      >
        ← Back to Companies
      </Link>

      <h1 className="text-3xl font-bold mt-4">
        {company.name}
      </h1>

      {/* Company Information */}
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">
          Company Information
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <p className="text-gray-500">Domain</p>
            <p>{company.domain || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">Industry</p>
            <p>{company.industry || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">Phone</p>
            <p>{company.phone || "-"}</p>
          </div>

          <div>
            <p className="text-gray-500">Website</p>
            <p>{company.website || "-"}</p>
          </div>

          <div className="col-span-2">
            <p className="text-gray-500">Address</p>
            <p>{company.address || "-"}</p>
          </div>

        </div>
      </div>

      {/* Associated Contacts */}
      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Associated Contacts ({contacts.length})
        </h2>

        {contacts.length === 0 ? (
          <p className="text-gray-500">
            No contacts found.
          </p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id} className="border-t">
                  <td className="p-3">
                    {contact.firstName} {contact.lastName}
                  </td>

                  <td className="p-3">
                    {contact.email}
                  </td>

                  <td className="p-3">
                    {contact.phone || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Associated Leads */}
      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Associated Leads ({leads.length})
        </h2>

        {leads.length === 0 ? (
          <p className="text-gray-500">
            No leads found.
          </p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Stage</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-t">
                  <td className="p-3">
                    {lead.firstName} {lead.lastName}
                  </td>

                  <td className="p-3">
                    {lead.email}
                  </td>

                  <td className="p-3">
                    {lead.phone || "-"}
                  </td>

                  <td className="p-3">
                    {lead.lifecycleStage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </DashboardLayout>
  );
};

export default CompanyDetails;