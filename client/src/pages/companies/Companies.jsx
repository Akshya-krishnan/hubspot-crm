import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import CompanyToolbar from "../../components/companies/CompanyToolbar";
import CompanyDrawer from "../../components/companies/CompanyDrawer";
import CompanyTable from "../../components/companies/CompanyTable";
import Pagination from "../../components/common/Pagination";
import toast from "react-hot-toast";

import {
  getCompanies,
  deleteCompany,
} from "../../services/companyService";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const fetchCompanies = async (
    page = currentPage,
    searchText = search
  ) => {
    try {
      setLoading(true);

      const response = await getCompanies(
        page,
        10,
        searchText
      );

      setCompanies(response.data);
      setCurrentPage(response.page);
      setTotalPages(response.totalPages);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load companies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies(currentPage, search);
  }, [currentPage]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this company?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCompany(id);

      toast.success("Company deleted successfully.");

      fetchCompanies(currentPage, search);

    } catch (error) {
      console.error(error);

      toast.error("Failed to delete company.");
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Companies
      </h1>

      <CompanyToolbar
        search={search}
        onSearch={(value) => {
          setSearch(value);
          setCurrentPage(1);
          fetchCompanies(1, value);
        }}
        onCreateCompany={() => {
          setEditingCompany(null);
          setIsDrawerOpen(true);
        }}
      />

      <CompanyDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingCompany(null);
        }}
        company={editingCompany}
        onCompanyCreated={() =>
          fetchCompanies(currentPage, search)
        }
      />

      <CompanyTable
        companies={companies}
        loading={loading}
        onEdit={(company) => {
          setEditingCompany(company);
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

export default Companies;