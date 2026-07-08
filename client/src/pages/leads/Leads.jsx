import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import LeadToolbar from "../../components/leads/LeadToolbar";
import LeadTable from "../../components/leads/LeadTable";
import Pagination from "../../components/common/Pagination";
import { getLeads } from "../../services/leadService";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLeads = async (page = 1) => {
    try {
      setLoading(true);

      const response = await getLeads(page);

      setLeads(response.data);
      setCurrentPage(response.page);
      setTotalPages(response.totalPages);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(currentPage);
  }, [currentPage]);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Leads</h1>

      <LeadToolbar />

      <LeadTable leads={leads} loading={loading} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </DashboardLayout>
  );
};

export default Leads;