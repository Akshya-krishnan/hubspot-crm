import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";
import Pagination from "../../components/common/Pagination";

import DealToolbar from "../../components/deals/DealToolbar";
import DealTable from "../../components/deals/DealTable";
import DealDrawer from "../../components/deals/DealDrawer";

import {
  getDeals,
  deleteDeal,
} from "../../services/dealService";

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const [editingDeal, setEditingDeal] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchDeals = async (
    page = currentPage,
    searchText = search
  ) => {
    try {
      setLoading(true);

      const response = await getDeals(
        page,
        10,
        searchText
      );

      setDeals(response.data);
      setCurrentPage(response.page);
      setTotalPages(response.totalPages);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load deals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals(currentPage, search);
  }, [currentPage]);

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
    fetchDeals(1, value);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this deal?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDeal(id);

      toast.success("Deal deleted successfully");

      fetchDeals(currentPage, search);

    } catch (error) {
      console.error(error);
      toast.error("Failed to delete deal");
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Deals
      </h1>

      <DealToolbar
        search={search}
        onSearch={handleSearch}
        onCreateDeal={() => {
          setEditingDeal(null);
          setIsDrawerOpen(true);
        }}
      />

      <DealDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingDeal(null);
        }}
        deal={editingDeal}
        onDealCreated={() =>
          fetchDeals(currentPage, search)
        }
      />

      <DealTable
        deals={deals}
        loading={loading}
        onEdit={(deal) => {
          setEditingDeal(deal);
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

export default Deals;