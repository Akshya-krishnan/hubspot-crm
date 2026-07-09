import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";
import LeadToolbar from "../../components/leads/LeadToolbar";
import LeadTable from "../../components/leads/LeadTable";
import Pagination from "../../components/common/Pagination";
import LeadDrawer from "../../components/leads/LeadDrawer";

import {
  getLeads,
  deleteLead,
} from "../../services/leadService";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);

  const [search, setSearch] = useState("");

  const [leadSource, setLeadSource] = useState("");
const [lifecycleStage, setLifecycleStage] = useState("");

  const fetchLeads = async (page = 1, searchText = search) => {
  try {
    setLoading(true);

    const response = await getLeads(
  page,
  10,
  search,
  leadSource,
  lifecycleStage
);
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
}, [currentPage, search, leadSource, lifecycleStage]);


  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this lead?"
  );

  if (!confirmDelete) return;

  try {
    await deleteLead(id);

    toast.success("Lead deleted successfully");

    fetchLeads(currentPage);
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message || "Failed to delete lead"
    );
  }
};

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Leads</h1>

      <LeadToolbar
  search={search}
  onSearchChange={setSearch}

  leadSource={leadSource}
  onLeadSourceChange={setLeadSource}

  lifecycleStage={lifecycleStage}
  onLifecycleStageChange={setLifecycleStage}

  onCreateLead={() => {
    setEditingLead(null);
    setIsDrawerOpen(true);
  }}
/>

      <LeadDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingLead(null);
        }}
        lead={editingLead}
        onLeadCreated={() => fetchLeads(currentPage)}
      />

      <LeadTable
  leads={leads}
  loading={loading}
  onEdit={(lead) => {
    setEditingLead(lead);
    setIsDrawerOpen(true);
  }}
  onDelete={handleDelete}
/>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </DashboardLayout>
  );
};

export default Leads;